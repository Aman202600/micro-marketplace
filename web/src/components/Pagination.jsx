import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ current, total, onPageChange }) => {
    if (total <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-3">
            <button
                onClick={() => onPageChange(current - 1)}
                disabled={current === 1}
                className="p-3 rounded-2xl border border-slate-200 bg-white text-slate-400 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all duration-300 shadow-sm disabled:shadow-none"
            >
                <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-2">
                {[...Array(total)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => onPageChange(i + 1)}
                        className={`w-11 h-11 rounded-2xl text-sm font-bold transition-all duration-300 ${current === i + 1
                                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                                : 'bg-white border border-slate-200 text-slate-500 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(current + 1)}
                disabled={current === total}
                className="p-3 rounded-2xl border border-slate-200 bg-white text-slate-400 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all duration-300 shadow-sm disabled:shadow-none"
            >
                <ChevronRight size={20} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default Pagination;
