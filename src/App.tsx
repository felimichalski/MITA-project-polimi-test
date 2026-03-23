import { useState, ReactNode } from 'react';
import { motion, AnimatePresence, setTarget } from 'motion/react';
import { 
  Map as MapIcon, 
  MessageSquare, 
  Camera, 
  Info, 
  ChevronRight, 
  Volume2, 
  X,
  Mic,
  Send,
  Sparkles,
  MapPin
} from 'lucide-react';
import { CONTENT_UNITS } from './constants';
import { ContentUnit, Message } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'chat' | 'vision' | 'map'>('explore');
  const [visionMode, setVisionMode] = useState<'point-ask' | 'tour' | 'compare'>('point-ask');
  const [selectedUnit, setSelectedUnit] = useState<ContentUnit | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Welcome to GAM Milano! I am your digital curator. How can I assist your visit today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [targetUnit, setTargetUnit] = useState<ContentUnit | null>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    
    // Mock response
    setTimeout(() => {
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: `That's a great question about ${inputValue.includes('tree') ? 'our Centennial Oak' : 'the campus'}. Would you like me to show you the best route there?` 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      {/* Header */}
      <header className="p-6 pt-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-olive font-semibold mb-1">Galleria d'Arte Moderna</p>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-ink leading-none">GAM<br />Milano</h1>
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-olive flex items-center justify-center text-white shadow-lg">
            <MapIcon size={24} />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'explore' && (
              <motion.div 
                key="explore"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 space-y-12"
              >
                <section>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-semibold">Highlights</h2>
                    <span className="text-sm text-gray-400 font-mono tracking-widest">03 ITEMS</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {CONTENT_UNITS.map((unit) => (
                      <motion.div 
                        key={unit.id}
                        whileHover={{ y: -10 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedUnit(unit)}
                        className="group cursor-pointer"
                      >
                        <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-4 shadow-xl">
                          <img 
                            src={unit.imageUrl} 
                            alt={unit.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                            {unit.category}
                          </div>
                        </div>
                        <div className="flex justify-between items-start px-2">
                          <div>
                            <h3 className="text-2xl font-medium group-hover:text-brand-olive transition-colors">{unit.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mt-1">{unit.description}</p>
                          </div>
                          <div className="mt-1 p-2.5 rounded-full bg-gray-50 group-hover:bg-brand-olive group-hover:text-white transition-all shadow-sm">
                            <ChevronRight size={20} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'chat' && (
              <motion.div 
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-[70vh] p-6 md:p-12 max-w-4xl mx-auto"
              >
                <div className="flex-1 space-y-6 overflow-y-auto mb-8 pr-4 custom-scrollbar">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] p-5 md:p-6 rounded-3xl shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-brand-olive text-white rounded-tr-none' 
                          : 'bg-gray-100 text-brand-ink rounded-tl-none'
                      }`}>
                        <p className="text-base md:text-lg leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about the gardens..."
                    className="w-full bg-gray-100 rounded-2xl py-6 pl-8 pr-32 text-lg focus:outline-none focus:ring-4 focus:ring-brand-olive/10 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                    <button className="p-3 text-gray-400 hover:text-brand-olive transition-colors">
                      <Mic size={24} />
                    </button>
                    <button 
                      onClick={handleSendMessage}
                      className="p-3 bg-brand-olive text-white rounded-xl shadow-lg shadow-brand-olive/20 hover:scale-105 transition-transform"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'vision' && (
              <motion.div 
                key="vision"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[80vh] relative bg-black rounded-[3rem] mx-6 overflow-hidden shadow-2xl"
              >
                {/* Vision Mode Selector */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex bg-white/10 backdrop-blur-xl p-1.5 rounded-2xl border border-white/20">
                  <button 
                    onClick={() => setVisionMode('point-ask')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${visionMode === 'point-ask' ? 'bg-white text-brand-ink shadow-lg' : 'text-white/60 hover:text-white'}`}
                  >
                    POINT & ASK
                  </button>
                  <button 
                    onClick={() => setVisionMode('tour')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${visionMode === 'tour' ? 'bg-white text-brand-ink shadow-lg' : 'text-white/60 hover:text-white'}`}
                  >
                    CURATED TOUR
                  </button>
                  <button 
                    onClick={() => setVisionMode('compare')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${visionMode === 'compare' ? 'bg-white text-brand-ink shadow-lg' : 'text-white/60 hover:text-white'}`}
                  >
                    COMPARE
                  </button>
                </div>

                {/* Mock Camera View */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {visionMode === 'point-ask' && (
                      <motion.div 
                        key="point-ask-view"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-64 h-64 md:w-96 md:h-96 border-2 border-white/20 rounded-[3rem] relative"
                      >
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-2xl" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-2xl" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-2xl" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-2xl" />
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="absolute -top-16 left-1/2 -translate-x-1/2 bg-brand-olive text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-3 whitespace-nowrap shadow-2xl border border-white/20"
                        >
                          <Sparkles size={18} />
                          SCANNING: LE DUE MADRI (SEGANTINI)
                        </motion.div>
                      </motion.div>
                    )}

                    {visionMode === 'tour' && (
                      <motion.div 
                        key="tour-view"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex flex-col items-center gap-8"
                      >
                        <div className="w-72 h-72 rounded-full border-4 border-dashed border-white/30 flex items-center justify-center relative">
                          <div className="absolute inset-4 rounded-full border-2 border-white/10 animate-pulse" />
                          <div className="text-center text-white">
                            <p className="text-xs font-bold tracking-widest opacity-60 mb-2">NEXT STOP</p>
                            <h3 className="text-2xl font-serif">Divisionism Wing</h3>
                            <p className="text-[10px] mt-2 bg-white/20 px-3 py-1 rounded-full">12m AHEAD</p>
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 max-w-xs text-center">
                          <p className="text-white text-sm">Follow the path to discover the secrets of Italian Divisionism.</p>
                        </div>
                      </motion.div>
                    )}

                    {visionMode === 'compare' && (
                      <motion.div 
                        key="compare-view"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="flex gap-4"
                      >
                        <div className="w-40 h-64 md:w-56 md:h-80 border-2 border-white/40 rounded-2xl relative bg-white/5 flex flex-col items-center justify-end p-4">
                          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/60" />
                          <p className="text-[10px] text-white font-bold">TARGET A</p>
                        </div>
                        <div className="w-40 h-64 md:w-56 md:h-80 border-2 border-white/40 rounded-2xl relative bg-white/5 flex flex-col items-center justify-end p-4">
                          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/60" />
                          <p className="text-[10px] text-white font-bold">TARGET B</p>
                        </div>
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white text-brand-ink px-4 py-2 rounded-full text-[10px] font-bold shadow-xl">
                          ALIGN TWO ARTWORKS TO COMPARE
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="absolute bottom-16 left-0 right-0 px-8 text-center">
                  <AnimatePresence mode="wait">
                    {visionMode === 'point-ask' && (
                      <motion.div 
                        key="point-ask-controls"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="flex flex-col items-center gap-8"
                      >
                        <p className="text-white/60 text-lg max-w-xl mx-auto">Identify artworks and ask the assistant for deep insights.</p>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-2xl flex items-center gap-4 text-lg font-medium shadow-2xl"
                        >
                          <Mic size={24} className="text-brand-olive" />
                          "Tell me about this painting"
                        </motion.button>
                        <button className="w-24 h-24 rounded-full border-4 border-white p-1.5 transition-transform hover:scale-110">
                          <div className="w-full h-full rounded-full bg-white/30" />
                        </button>
                      </motion.div>
                    )}

                    {visionMode === 'tour' && (
                      <motion.div 
                        key="tour-controls"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="flex flex-col items-center gap-8"
                      >
                        <p className="text-white/60 text-lg max-w-xl mx-auto">A guided journey through the gallery's masterpieces.</p>
                        <button className="bg-brand-olive text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 transition-transform">
                          START TOUR
                        </button>
                      </motion.div>
                    )}

                    {visionMode === 'compare' && (
                      <motion.div 
                        key="compare-controls"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="flex flex-col items-center gap-8"
                      >
                        <p className="text-white/60 text-lg max-w-xl mx-auto">Discover stylistic similarities and historical connections.</p>
                        <button className="w-24 h-24 rounded-full border-4 border-white p-1.5 transition-transform hover:scale-110 flex items-center justify-center">
                          <div className="w-full h-full rounded-full bg-white/30 flex items-center justify-center">
                            <Sparkles size={32} className="text-white/40" />
                          </div>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeTab === 'map' && (
              <motion.div 
                key="map"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 h-full flex flex-col space-y-8"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-brand-olive uppercase tracking-widest mb-2">Interactive Campus Map</p>
                    <h2 className="text-4xl md:text-5xl font-semibold">Gallery Map</h2>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-brand-olive/10 text-brand-olive px-4 py-2 rounded-full text-xs font-bold border border-brand-olive/20">LEVEL 1</span>
                  </div>
                </div>
                
                <div className="flex-1 bg-white rounded-[3rem] border-2 border-dashed border-brand-olive/20 relative overflow-hidden shadow-inner flex items-center justify-center min-h-[400px]">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-brand-olive rounded-full" />
                    <div className="absolute top-0 left-0 w-full h-full grid grid-cols-8 grid-rows-8 gap-4 p-4">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-brand-olive/20 rounded-sm" />
                      ))}
                    </div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {!targetUnit ? (
                      <motion.div 
                        key="idle-map"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative z-10 text-center space-y-6 px-6"
                      >
                        <div className="w-24 h-24 bg-brand-olive/10 rounded-full flex items-center justify-center mx-auto animate-bounce">
                          <MapPin size={48} className="text-brand-olive" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Select an artwork to begin guidance</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
                          {CONTENT_UNITS.map(unit => (
                            <button 
                              key={unit.id} 
                              onClick={() => setTargetUnit(unit)}
                              className="px-5 py-3 bg-white border border-brand-olive/20 rounded-2xl text-xs font-bold hover:bg-brand-olive hover:text-white transition-all shadow-sm flex items-center gap-2"
                            >
                              <Sparkles size={14} className="opacity-40" />
                              {unit.title}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="guidance-map"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative z-10 w-full h-full p-8 flex flex-col"
                      >
                        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                          <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-brand-olive/20 flex items-center justify-center">
                              <div className="w-24 h-24 rounded-full border-4 border-brand-olive border-t-transparent animate-spin" />
                            </div>
                            <MapPin size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-olive" />
                          </div>
                          
                          <div className="text-center space-y-2">
                            <h3 className="text-2xl font-semibold">Guiding to {targetUnit.title}</h3>
                            <p className="text-brand-olive font-medium flex items-center justify-center gap-2">
                              <ChevronRight size={18} className="rotate-90" />
                              Proceed to {targetUnit.location.name}
                            </p>
                            <p className="text-gray-400 text-sm italic">Estimated time: 2 mins • 45 meters</p>
                          </div>
                        </div>

                        <div className="bg-brand-olive/5 border border-brand-olive/10 p-6 rounded-3xl flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md">
                              <img src={targetUnit.imageUrl} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-brand-olive uppercase tracking-widest">Destination</p>
                              <p className="font-bold">{targetUnit.title}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setTargetUnit(null)}
                            className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-white/90 backdrop-blur-2xl border border-gray-100 px-10 py-5 flex justify-between items-center z-50 rounded-[2.5rem] shadow-2xl">
        <NavButton 
          active={activeTab === 'explore'} 
          onClick={() => setActiveTab('explore')}
          icon={<MapIcon size={28} />}
          label="Explore"
        />
        <NavButton 
          active={activeTab === 'vision'} 
          onClick={() => setActiveTab('vision')}
          icon={<Camera size={28} />}
          label="Vision"
        />
        <NavButton 
          active={activeTab === 'chat'} 
          onClick={() => setActiveTab('chat')}
          icon={<MessageSquare size={28} />}
          label="Chat"
        />
        <NavButton 
          active={activeTab === 'map'} 
          onClick={() => setActiveTab('map')}
          icon={<MapPin size={28} />}
          label="Map"
        />
      </nav>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedUnit && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-ink/60 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-auto max-h-[90vh]"
            >
              <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                <img 
                  src={selectedUnit.imageUrl} 
                  alt={selectedUnit.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedUnit(null)}
                  className="absolute top-8 left-8 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors md:hidden"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 p-8 md:p-16 overflow-y-auto relative">
                <button 
                  onClick={() => setSelectedUnit(null)}
                  className="absolute top-8 right-8 p-3 bg-gray-100 rounded-full text-gray-400 hover:text-brand-ink transition-colors hidden md:block"
                >
                  <X size={24} />
                </button>
                
                <div className="space-y-10">
                  <div>
                    <div className="flex items-center gap-3 text-brand-olive mb-4">
                      <Info size={20} />
                      <span className="text-sm font-bold uppercase tracking-[0.2em]">{selectedUnit.category}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{selectedUnit.title}</h2>
                    <p className="text-xl text-gray-600 leading-relaxed font-light">{selectedUnit.description}</p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Heritage Insights</h4>
                    <ul className="grid grid-cols-1 gap-4">
                      {selectedUnit.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-5 text-lg text-gray-700 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                          <div className="w-2 h-2 rounded-full bg-brand-olive shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button className="flex-1 bg-brand-olive text-white py-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-brand-olive/20 hover:scale-[1.02] transition-transform">
                      <Volume2 size={24} />
                      Listen to Heritage Story
                    </button>
                    <button className="p-6 bg-gray-100 rounded-2xl text-brand-olive hover:bg-gray-200 transition-colors" onClick={() => {
                       setSelectedUnit(null);
                       setActiveTab('map');
                       setTargetUnit(selectedUnit);
                      }}
                     >
                      <MapPin size={28} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  
  function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: ReactNode, label: string }) {
    return (
      <button 
        onClick={() => {
          onClick();
          setTargetUnit(null);
        }}
        className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-brand-olive scale-110' : 'text-gray-300'}`}
      >
        <div className={`p-2 rounded-2xl transition-colors ${active ? 'bg-brand-olive/10' : ''}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-tighter ${active ? 'opacity-100' : 'opacity-0'}`}>
          {label}
        </span>
      </button>
    );
  }
}
