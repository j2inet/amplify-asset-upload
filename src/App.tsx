import { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import { uploadData } from 'aws-amplify/storage';
import type { Schema } from '../amplify/data/resource';
import { ALLOWED_EXTENSIONS, isAllowedFile } from './fileValidation';

const client = generateClient<Schema>();

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('');
    const f = e.target.files?.[0] ?? null;
    if (f && !isAllowedFile(f.name)) {
      setFile(null);
      setError(`Only Excel or CSV files are allowed (${ALLOWED_EXTENSIONS.join(', ')}).`);
      e.target.value = '';
      return;
    }
    setError('');
    setFile(f);
  };

  const onUpload = async () => {
    if (!file) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await uploadData({ path: `uploads/${file.name}`, data: file }).result;
      const res = await client.mutations.triggerProcessing({ fileName: file.name });
      if (res.errors?.length) throw new Error(res.errors[0].message);
      setMessage('Your file was successfully uploaded and processing for it will begin soon.');
      setFile(null);
    } catch (err) {
      setError(`Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Authenticator hideSignUp>
      {({ signOut }) => (
        <main>
          <h1>Upload a file</h1>
          <input type="file" accept={ALLOWED_EXTENSIONS.join(',')} onChange={onSelect} />
          <button onClick={onUpload} disabled={!file || busy}>
            Upload
          </button>
          <button onClick={signOut}>Sign out</button>
          {error && <p role="alert">{error}</p>}
          {message && <p role="status">{message}</p>}
        </main>
      )}
    </Authenticator>
  );
}
