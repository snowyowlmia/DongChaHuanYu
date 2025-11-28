import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { RotatingSystem } from './components/Globe';
import { StarMap } from './components/StarMap';
import { Sidebar } from './components/Sidebar';
import { ViewMode, SelectionData } from './types';
import { Globe, Radio, Sparkles, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.EARTH);
  const [selectedItem, setSelectedItem] = useState<SelectionData | null>(null);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />

          {/* High visibility lighting setup */}
          <ambientLight intensity={3.5} />
          <pointLight position={[20, 20, 20]} intensity={1.5} color="#fff" />
          <pointLight position={[-20, -10, -20]} intensity={1.0} color="#ccddee" />

          <Stars radius={200} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />

          <Suspense fallback={null}>
            {viewMode === ViewMode.EARTH ? (
              <RotatingSystem onSelectEvent={setSelectedItem} isPaused={!!selectedItem} />
            ) : (
              <StarMap onSelectOrigin={setSelectedItem} />
            )}
          </Suspense>

          <OrbitControls
            enablePan={true}
            minDistance={3.0}
            maxDistance={viewMode === ViewMode.GALAXY ? 100 : 20}
            autoRotate={!selectedItem} // Stop orbit rotation when reading
            autoRotateSpeed={0.5}
            enableRotate={true} // Always allow manual rotation
          />
        </Canvas>
      </div>

      {/* Loading Overlay (Visible during Suspense) */}
      <Suspense fallback={
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
          <Loader2 size={48} className="text-cyan-500 animate-spin mb-4" />
          <div className="text-cyan-400 font-mono text-xl tracking-widest animate-pulse">正在初始化图谱...</div>
        </div>
      }>
        <div className="hidden"></div>
      </Suspense>

      {/* HUD / UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none p-4 md:p-6 flex flex-col justify-between">

        {/* Top Header */}
        <div className="flex justify-between items-start pointer-events-auto">
          <div>
            <h1 className="text-2xl md:text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              洞察寰宇
            </h1>
            <p className="text-cyan-700 text-xs font-mono mt-1 tracking-widest bg-black/40 inline-block px-2 py-1 rounded">
              非人类智能追踪系统
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex bg-slate-900/90 backdrop-blur rounded-lg p-1 border border-cyan-900/50 pointer-events-auto shadow-2xl scale-90 md:scale-100 origin-top-right">
          <button
            onClick={() => { setViewMode(ViewMode.EARTH); setSelectedItem(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${viewMode === ViewMode.EARTH ? 'bg-cyan-950 text-cyan-300 shadow-[0_0_15px_rgba(8,145,178,0.3)] border border-cyan-800' : 'text-slate-500 hover:text-cyan-400'}`}
          >
            <Globe size={18} />
            <span className="font-mono text-sm font-bold">地球视角</span>
          </button>
          <button
            onClick={() => { setViewMode(ViewMode.GALAXY); setSelectedItem(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${viewMode === ViewMode.GALAXY ? 'bg-cyan-950 text-cyan-300 shadow-[0_0_15px_rgba(8,145,178,0.3)] border border-cyan-800' : 'text-slate-500 hover:text-cyan-400'}`}
          >
            <Sparkles size={18} />
            <span className="font-mono text-sm font-bold">星系视角</span>
          </button>
        </div>

        {/* Bottom Status */}
        <div className="pointer-events-auto w-full max-w-md">
          <div className="bg-slate-900/80 backdrop-blur border border-slate-800 p-3 md:p-4 rounded-lg flex items-center gap-3 md:gap-4">
            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
            <div className="flex-1">
              <div className="text-[10px] text-slate-400 uppercase font-mono mb-1">系统状态</div>
              <div className="text-cyan-400 text-sm font-mono truncate">
                {viewMode === ViewMode.EARTH
                  ? "监测全球异常事件 // 运行中"
                  : "深空扫描 // 搜寻信号源"}
              </div>
            </div>
            <Radio className="text-slate-600" size={20} />
          </div>
        </div>
      </div>

      {/* Detailed Sidebar */}
      <div className="pointer-events-auto">
        <Sidebar data={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>

    </div >
  );
};

export default App;