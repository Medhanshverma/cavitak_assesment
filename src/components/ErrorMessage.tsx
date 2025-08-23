interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div style={{ 
      color: '#721c24', 
      backgroundColor: '#f8d7da', 
      padding: '20px', 
      borderRadius: '12px',
      marginTop: '20px',
      border: '1px solid #f5c6cb',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 4px 12px rgba(248, 215, 218, 0.4)'
    }}>
      <div style={{ 
        fontSize: '24px',
        flexShrink: 0
      }}>
        ⚠️
      </div>
      <div>
        <div style={{ 
          fontWeight: '600',
          marginBottom: '4px',
          fontSize: '16px'
        }}>
          Something went wrong
        </div>
        <div style={{ 
          fontSize: '14px',
          opacity: 0.9
        }}>
          {message}
        </div>
      </div>
    </div>
  );
}
