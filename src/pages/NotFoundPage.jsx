import { Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
    
        <span className="text-brand-primary font-mono text-sm tracking-widest mb-2">
          ERROR_CODE: 404 
        </span>

        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 italic leading-tight">
          Scene Not Found<span className="text-brand-primary">.</span>
        </h1>

        <p className="text-zinc-500 max-w-sm text-sm md:text-base leading-relaxed mb-8 border-y md:border-y-0 md:border-l border-zinc-800 py-4 md:py-0 md:pl-4">
          The requested URL does not exist in our database. 
          It might have been moved or permanently deleted.
        </p>

        <Link 
          to="/" 
          className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] hover:text-brand-primary transition-colors"
        >
          <MoveLeft size={18}/>
          Back to Home
        </Link>
      </div>
    </div>  
  );
};

export default NotFoundPage;