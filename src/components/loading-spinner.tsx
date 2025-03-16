export default function LoadingSpinner({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
    const sizeClass = {
      small: 'h-4 w-4 border-2',
      medium: 'h-8 w-8 border-2',
      large: 'h-12 w-12 border-3',
    }[size];
  
    return (
      <div className="flex justify-center items-center">
        <div className={`${sizeClass} border-t-blue-500 animate-spin rounded-full border-gray-200`}></div>
      </div>
    );
  }