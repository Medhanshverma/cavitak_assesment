interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div style={{ 
      color: '#d32f2f', 
      backgroundColor: '#ffebee', 
      padding: '15px', 
      borderRadius: '6px',
      marginTop: '20px',
      border: '1px solid #ffcdd2'
    }}>
      <strong>Error:</strong> {message}
    </div>
  );
}
