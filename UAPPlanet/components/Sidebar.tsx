import React, { useEffect, useState } from 'react';
import { SelectionData } from '../types';
import { analyzeSelection } from '../services/geminiService';
import { X, Radar, Loader2, Database } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface SidebarProps {
  data: SelectionData | null;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ data, onClose }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setLoading(true);
      setAnalysis(''); // Clear previous
      analyzeSelection(data)
        .then(result => {
          setAnalysis(result);
        })
        .catch(err => setAnalysis("获取情报数据失败。"))
        .finally(() => setLoading(false));
    }
  }, [data]);

  if (!data) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-slate-950/90 backdrop-blur-xl border-l border-cyan-900 text-cyan-50 shadow-2xl z-50 transition-transform transform translate-x-0 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-cyan-900/50 flex justify-between items-start bg-gradient-to-r from-slate-900 to-slate-950">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <Radar size={16} className={loading ? "animate-spin" : ""} />
            <span className="text-xs font-mono uppercase tracking-widest">
              {'locationName' in data ? '地球事件' : '天体起源'}
            </span>
          </div>
          <h2 className="text-2xl font-bold font-mono text-white leading-tight">{data.id === 'zeta-reticuli' ? 'Zeta Reticuli' : ('title' in data ? data.title : data.name)}</h2>
          <p className="text-sm text-cyan-600 mt-1 font-mono">
            ID: {data.id.toUpperCase()} // 机密
          </p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-cyan-900/30 rounded-full transition-colors">
          <X size={24} className="text-cyan-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Archival Image */}
        {data.image && (
          <div className="mb-6 rounded-lg overflow-hidden border border-cyan-900/50 shadow-lg relative group bg-black/40">
            <img
              src={data.image}
              alt={data.id}
              className="w-full h-auto max-h-96 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
              <span className={`text-[10px] font-mono uppercase tracking-widest border px-1 rounded ${data.isAI
                ? 'text-amber-400 border-amber-500/30'
                : 'text-cyan-400 border-cyan-500/30'
                }`}>
                {data.isAI ? 'AI 模拟影像 // SIMULATION' : '机密档案影像 // CLASSIFIED'}
              </span>
            </div>
          </div>
        )}

        {/* Basic Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 p-3 rounded border border-cyan-900/30">
            <span className="block text-xs text-cyan-500 mb-1 uppercase">日期 / 距离</span>
            <span className="font-mono text-sm">{'year' in data ? data.year : data.distance}</span>
          </div>
          <div className="bg-slate-900/50 p-3 rounded border border-cyan-900/30">
            <span className="block text-xs text-cyan-500 mb-1 uppercase">类型</span>
            <span className="font-mono text-sm">
              {'type' in data ? data.type : '未知'}
            </span>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="relative min-h-[200px]">
          <div className="flex items-center gap-2 mb-3 text-cyan-300">
            <Database size={16} />
            <h3 className="font-bold text-sm uppercase tracking-wide">Gemini 情报简报</h3>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 text-cyan-600">
              <Loader2 size={32} className="animate-spin" />
              <span className="font-mono text-xs animate-pulse">正在解密档案...</span>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm prose-cyan font-light leading-relaxed">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-cyan-900/50 bg-slate-950 text-center">
        <p className="text-[10px] text-cyan-800 font-mono uppercase">
          仅限授权使用 • Majestic-12 许可级别
        </p>
      </div>
    </div>
  );
};