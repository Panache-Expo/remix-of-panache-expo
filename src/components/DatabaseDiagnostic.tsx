import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const DatabaseDiagnostic = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [message, setMessage] = useState('Checking database connection...');
  const [details, setDetails] = useState('');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Test query to contact_submissions table - just check if table exists with a simple select
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('id')
          .limit(1);

        if (error) {
          setStatus('error');
          const errorMsg = error.message;
          
          if (errorMsg.includes('contact_submissions')) {
            setMessage('❌ Table Not Found: contact_submissions');
            setDetails('You need to run the database setup SQL. See DATABASE_SETUP_INSTRUCTIONS.md');
          } else if (errorMsg.includes('schema cache')) {
            setMessage('❌ Schema Cache Error');
            setDetails('Tables may not be created. Run DATABASE_SETUP.sql in Supabase SQL Editor');
          } else if (errorMsg.includes('aggregate')) {
            setMessage('❌ Query Error');
            setDetails('There was an issue with the database query. Please refresh and try again.');
          } else {
            setMessage(`❌ Database Error: ${errorMsg}`);
            setDetails('Check your Supabase credentials in .env.local');
          }
          
          console.error('Database error:', error);
        } else {
          setStatus('connected');
          setMessage('✅ Database Connected');
          setDetails(`Tables verified and accessible. Ready to use!`);
          console.log('Database connection OK');
        }
      } catch (err) {
        setStatus('error');
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        setMessage(`❌ Connection Error: ${errorMsg}`);
        setDetails('Check browser console for more details');
        console.error('Connection error:', err);
      }
    };

    checkConnection();
  }, []);

  if (status === 'checking') {
    return (
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto shadow-sm">
        <p className="text-blue-900 font-semibold text-sm">{message}</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-3 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto shadow-sm">
        <p className="text-red-900 font-semibold text-sm">{message}</p>
        <p className="text-red-800 text-xs mt-1">{details}</p>
        <p className="text-red-700 text-xs mt-2 font-mono bg-red-100 p-2 rounded">
          📄 See: DATABASE_SETUP_INSTRUCTIONS.md
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 bg-green-50 border border-green-200 rounded-lg max-w-2xl mx-auto shadow-sm">
      <p className="text-green-900 font-semibold text-sm">{message}</p>
      <p className="text-green-800 text-xs mt-1">{details}</p>
    </div>
  );
};

export default DatabaseDiagnostic;
