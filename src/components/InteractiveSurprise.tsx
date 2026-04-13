'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Confetti from 'react-confetti';
import { Heart, Sparkles } from 'lucide-react';

/* ── Proposal build-up lines ─────────────────────────── */
const PROPOSAL_LINES = [
  { bn: "আমার খেপি,", en: "My most precious one," },
  { bn: "তুমি আমার জীবনে আসার পর থেকেই", en: "Ever since you came into my life," },
  { bn: "প্রতিটা সকাল আরও সুন্দর হয়ে উঠেছে।", en: "every morning has become more beautiful." },
  { bn: "তুমি আমার সুখ, আমার শান্তি,", en: "You are my happiness, my peace," },
  { bn: "আমার একমাত্র আশ্রয় আর সাহস।", en: "my only shelter and my courage." },
  { bn: "", en: "" },
  { bn: "আমি তোমাকে চিরদিনের জন্য চাই। 💖", en: "I want you for all of forever. 💖" },
];

/* ── Thank-you sections — shown as blocks ─────────────── */
const TY_SECTIONS = [
  {
    emoji: "💍",
    headline: "হ্যাঁ বলার জন্য ধন্যবাদ",
    lines: [
      "আমি জানতাম তুমি কোনোদিন না বলবে না,",
      "কারণ আমরা একে অপরের জন্যই তৈরি হয়েছি।",
      "তোমার এই একটা 'হ্যাঁ' আমার গোটা পৃথিবী বদলে দিয়েছে।",
    ],
    en: "\"I knew it — because we were made for each other.\"",
  },
  {
    emoji: "🌹",
    headline: "তুমি আমার সবকিছু",
    lines: [
      "তুমি আমার রাতের শেষ চিন্তা,",
      "আর সকালের প্রথম হাসির কারণ।",
      "তোমাকে ছাড়া আমার কোনো স্বপ্নই সম্পূর্ণ না।",
      "তুমি শুধু আমার ভালোবাসা নও —",
      "তুমি আমার বাড়ি। 🏡",
    ],
    en: "\"You are not just my love — you are my home.\"",
  },
  {
    emoji: "💌",
    headline: "চিরকালের প্রতিশ্রুতি",
    lines: [
      "আজ থেকে আমি তোমার পাশে থাকব —",
      "তোমার প্রতিটা ভালো দিনে হাত ধরে হাঁটব,",
      "আর প্রতিটা কঠিন দিনে তোমার ঢাল হয়ে দাঁড়াব।",
      "তোমার চোখের জল মুছিয়ে দেওয়াটাই আমার দায়িত্ব।",
      "তোমাকে সারাজীবন ভালোবাসা আমার সিদ্ধান্ত। 🌸",
    ],
    en: "\"Loving you forever is not a feeling — it's my decision.\"",
  },
  {
    emoji: "✨",
    headline: "ধন্যবাদ, Inddu",
    lines: [
      "আমাকে বেছে নেওয়ার জন্য ধন্যবাদ।",
      "আমার ভুলগুলো মেনে নেওয়ার জন্য ধন্যবাদ।",
      "আমার ছোট ছোট ভালোবাসাগুলো বুঝে নেওয়ার জন্য ধন্যবাদ।",
      "তুমি আমার জীবনের সবচেয়ে সুন্দর অধ্যায়। 💝",
    ],
    en: "\"Thank you for choosing me, exactly as I am.\"",
  },
];

/* ── Floating emoji positions ─────────────────────────── */
const FLOATERS = [
  { top:'4%',  left:'6%',  em:'💖', dur:4,   delay:0 },
  { top:'8%',  left:'82%', em:'🌸', dur:5.5, delay:0.3 },
  { top:'22%', left:'94%', em:'✨', dur:4.5, delay:0.7 },
  { top:'40%', left:'2%',  em:'💕', dur:6,   delay:0.5 },
  { top:'55%', left:'90%', em:'🌹', dur:5,   delay:1.1 },
  { top:'70%', left:'7%',  em:'💫', dur:4,   delay:0.9 },
  { top:'80%', left:'85%', em:'💝', dur:5.5, delay:0.2 },
  { top:'90%', left:'45%', em:'🌺', dur:4,   delay:1.4 },
  { top:'15%', left:'50%', em:'💗', dur:6,   delay:0.6 },
  { top:'62%', left:'50%', em:'⭐', dur:5,   delay:1.8 },
];

/* ── Spark burst component ────────────────────────────── */
function SparkBurst() {
  const sparks = Array.from({ length: 18 }, (_, i) => ({
    angle: (360 / 18) * i,
    distance: 55 + Math.random() * 40,
    size: 6 + Math.random() * 8,
    color: ['#ff69b4','#ff1493','#ffd1dc','#fff','#f9a8d4','#e879f9'][Math.floor(Math.random()*6)],
    delay: Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {sparks.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: s.size, height: s.size, background: s.color }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            x: Math.cos((s.angle * Math.PI) / 180) * s.distance,
            y: Math.sin((s.angle * Math.PI) / 180) * s.distance,
            opacity: [1, 1, 0],
            scale: [1, 1.4, 0],
          }}
          transition={{ duration: 0.9, delay: s.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

/* ── Glowing ring component ───────────────────────────── */
function GlowRings() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {[1.6, 2.1, 2.7].map((scale, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-pink-400"
          style={{ width: 80, height: 80 }}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: [scale, scale + 0.4, scale], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────── */
export default function InteractiveSurprise() {
  const [stage, setStage] = useState<'idle' | 'proposal' | 'thankyou'>('idle');
  const [winSize, setWinSize] = useState({ width: 0, height: 0 });
  const [sparkKey, setSparkKey] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleOpenProposal = () => {
    setWinSize({ width: window.innerWidth, height: window.innerHeight });
    setStage('proposal');
  };

  const handleYes = () => {
    setWinSize({ width: window.innerWidth, height: window.innerHeight });
    setSparkKey(k => k + 1);
    setStage('thankyou');
    setActiveSection(0);
  };

  // Auto-scroll to next section
  useEffect(() => {
    if (stage !== 'thankyou') return;
    if (activeSection >= TY_SECTIONS.length - 1) return;
    const t = setTimeout(() => setActiveSection(s => s + 1), 3800 + activeSection * 200);
    return () => clearTimeout(t);
  }, [stage, activeSection]);

  return (
    <section className="py-24 px-5 flex flex-col items-center justify-center relative min-h-[70vh]">

      {/* ── Confetti ── */}
      {(stage === 'proposal' || stage === 'thankyou') && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <Confetti
            width={winSize.width} height={winSize.height}
            recycle={false}
            numberOfPieces={stage === 'thankyou' ? 700 : 500}
            gravity={0.16}
            colors={['#ff69b4','#ff1493','#ffc0cb','#fff','#ffd1dc','#f9a8d4','#e879f9','#fbbf24']}
            drawShape={ctx => {
              ctx.save(); ctx.beginPath();
              ctx.moveTo(7.5,4); ctx.bezierCurveTo(7.5,3.7,7,2.5,5,2.5);
              ctx.bezierCurveTo(2,2.5,2,6.25,2,6.25); ctx.bezierCurveTo(2,9,4,11.2,7.5,14);
              ctx.bezierCurveTo(11,11.2,13,9,13,6.25); ctx.bezierCurveTo(13,6.25,13,2.5,10,2.5);
              ctx.bezierCurveTo(8.5,2.5,7.5,3.7,7.5,4); ctx.fill(); ctx.restore();
            }}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          THANK-YOU FULL-SCREEN OVERLAY
      ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'thankyou' && (
          <motion.div
            key="ty-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{
              background: 'linear-gradient(160deg, #fff0f8 0%, #ffd6e7 30%, #ffe4f0 60%, #f5d0fe 100%)',
            }}
          >
            {/* ── Aurora blobs ── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(255,105,180,0.35), transparent)' }}
                animate={{ x:[0,60,0], y:[0,40,0] }}
                transition={{ duration:12, repeat:Infinity, ease:'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.3), transparent)' }}
                animate={{ x:[0,-50,0], y:[0,-30,0] }}
                transition={{ duration:14, repeat:Infinity, ease:'easeInOut' }}
              />
              <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(255,182,193,0.25), transparent)' }}
                animate={{ scale:[1,1.3,1] }}
                transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}
              />
            </div>

            {/* ── Floating emojis ── */}
            {FLOATERS.map((f, i) => (
              <motion.span
                key={i}
                className="fixed text-2xl pointer-events-none select-none"
                style={{ top: f.top, left: f.left }}
                initial={{ opacity:0, scale:0 }}
                animate={{ opacity:[0,0.85,0.55,0.85], y:[0,-18,0], scale:1 }}
                transition={{ duration:f.dur, repeat:Infinity, delay:f.delay+0.8, ease:'easeInOut' }}
              >
                {f.em}
              </motion.span>
            ))}

            {/* ── Content ── */}
            <div ref={scrollRef} className="relative z-10 flex flex-col items-center px-5 py-10 space-y-8 max-w-sm mx-auto">

              {/* Giant heart with sparks + rings */}
              <motion.div
                className="relative flex items-center justify-center mt-4"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type:'spring', damping:10, stiffness:80 }}
              >
                <GlowRings />
                <SparkBurst key={sparkKey} />
                <motion.div
                  animate={{ scale:[1,1.22,1], rotate:[0,10,-10,0] }}
                  transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }}
                >
                  <Heart
                    className="w-28 h-28 text-pink-500 fill-pink-400"
                    style={{ filter:'drop-shadow(0 0 30px rgba(255,105,180,1)) drop-shadow(0 0 60px rgba(255,20,147,0.6))' }}
                  />
                </motion.div>
                {/* Orbiting sparkles */}
                {[0,1,2,3].map(i => (
                  <motion.div
                    key={i}
                    className="absolute"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3 + i * 0.5, repeat:Infinity, ease:'linear' }}
                    style={{ width: 100 + i*20, height: 100 + i*20 }}
                  >
                    <motion.div
                      className="absolute"
                      style={{ top: 0, left: '50%', transform:'translateX(-50%)' }}
                      animate={{ scale:[1,1.5,1], opacity:[0.6,1,0.6] }}
                      transition={{ duration:1.2, repeat:Infinity, delay: i*0.3 }}
                    >
                      <Sparkles size={10 + i*2} className="text-pink-400 fill-pink-300" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* "তুমি হ্যাঁ বললে!" banner */}
              <motion.div
                initial={{ opacity:0, scale:0.5, y:20 }}
                animate={{ opacity:1, scale:1, y:0 }}
                transition={{ type:'spring', delay:0.4 }}
                className="text-center"
              >
                <motion.h1
                  animate={{ scale:[1,1.04,1] }}
                  transition={{ duration:2, repeat:Infinity }}
                  className="font-heading font-black text-4xl gradient-text-love glow-text leading-tight"
                >
                  তুমি হ্যাঁ বললে! 🎊
                </motion.h1>
                <motion.p
                  initial={{ opacity:0 }}
                  animate={{ opacity:1 }}
                  transition={{ delay:0.8 }}
                  className="font-cursive text-pink-500 text-xl mt-2"
                  style={{ fontFamily:'var(--font-dancing), cursive' }}
                >
                  You said yes, my love… 💍
                </motion.p>
              </motion.div>

              {/* Emoji sparkle row */}
              <motion.div
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                transition={{ delay:1 }}
                className="flex gap-3 text-2xl"
              >
                {['💖','🌸','✨','💍','🌹','💫','🥹','🌺'].map((em, i) => (
                  <motion.span
                    key={i}
                    animate={{ y:[0,-10,0], rotate:[0,15,-15,0] }}
                    transition={{ duration:2.2, repeat:Infinity, delay:i*0.18 }}
                  >
                    {em}
                  </motion.span>
                ))}
              </motion.div>

              {/* ── Section cards ── */}
              <div className="w-full space-y-5">
                {TY_SECTIONS.map((section, sIdx) => (
                  <AnimatePresence key={sIdx}>
                    {activeSection >= sIdx && (
                      <motion.div
                        initial={{ opacity:0, y:50, scale:0.88, rotate: sIdx%2===0 ? -3 : 3 }}
                        animate={{ opacity:1, y:0, scale:1, rotate:0 }}
                        transition={{ type:'spring', stiffness:90, damping:14, delay: sIdx===0 ? 1.2 : 0 }}
                        className="relative bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-pink-200 shadow-[0_15px_50px_rgba(255,105,180,0.25)]"
                      >
                        {/* Shimmer top strip */}
                        <div className="h-1.5 w-full shimmer"
                          style={{ background:'linear-gradient(90deg,#ffd1dc,#ff69b4,#ff1493,#ff69b4,#ffd1dc)' }} />

                        <div className="px-6 py-5 space-y-3">
                          {/* Section header */}
                          <div className="flex items-center gap-3">
                            <motion.span
                              animate={{ rotate:[0,20,-20,0], scale:[1,1.3,1] }}
                              transition={{ duration:2, repeat:Infinity, delay:sIdx*0.4 }}
                              className="text-3xl"
                            >
                              {section.emoji}
                            </motion.span>
                            <h3 className="font-heading font-black text-xl gradient-text-love">{section.headline}</h3>
                          </div>

                          {/* Bengali lines */}
                          <div className="space-y-1.5">
                            {section.lines.map((line, lIdx) => (
                              <motion.p
                                key={lIdx}
                                initial={{ opacity:0, x: lIdx%2===0 ? -20 : 20, filter:'blur(6px)' }}
                                animate={{ opacity:1, x:0, filter:'blur(0px)' }}
                                transition={{ delay: lIdx * 0.2 + 0.3, duration:0.55, ease:'easeOut' }}
                                className="font-heading font-semibold text-pink-800 text-[16px] leading-snug"
                              >
                                {line}
                              </motion.p>
                            ))}
                          </div>

                          {/* English cursive quote */}
                          <motion.div
                            initial={{ opacity:0, y:10 }}
                            animate={{ opacity:1, y:0 }}
                            transition={{ delay: section.lines.length * 0.2 + 0.6 }}
                            className="glass-dark px-4 py-3 rounded-2xl border border-white/60 mt-2"
                          >
                            <p
                              className="font-cursive text-pink-500 text-base italic"
                              style={{ fontFamily:'var(--font-dancing), cursive' }}
                            >
                              {section.en}
                            </p>
                          </motion.div>
                        </div>

                        {/* Shimmer bottom strip */}
                        <div className="h-1.5 w-full shimmer"
                          style={{ background:'linear-gradient(90deg,#ffd1dc,#ff69b4,#ff1493,#ff69b4,#ffd1dc)' }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>

              {/* ── Grand finale block ── */}
              <AnimatePresence>
                {activeSection >= TY_SECTIONS.length - 1 && (
                  <motion.div
                    initial={{ opacity:0, scale:0.7, rotate:-6 }}
                    animate={{ opacity:1, scale:1, rotate:0 }}
                    transition={{ type:'spring', stiffness:80, delay: 0.5 }}
                    className="w-full"
                  >
                    {/* Glowing ring card */}
                    <div
                      className="relative rounded-[2rem] p-1 overflow-hidden"
                      style={{ background:'linear-gradient(135deg,#ff69b4,#ff1493,#e879f9,#ff69b4)' }}
                    >
                      <div className="bg-white rounded-[1.75rem] px-6 py-7 text-center space-y-4">
                        {/* Pulsing ♾️ */}
                        <motion.div
                          animate={{ scale:[1,1.25,1], rotate:[0,360] }}
                          transition={{ scale:{duration:1.6,repeat:Infinity}, rotate:{duration:8,repeat:Infinity,ease:'linear'} }}
                          className="text-5xl"
                        >
                          ♾️
                        </motion.div>

                        <motion.p
                          animate={{ scale:[1,1.03,1] }}
                          transition={{ duration:2, repeat:Infinity }}
                          className="font-heading font-black text-3xl gradient-text-love glow-text"
                        >
                          আজ থেকে আমরা একসাথে
                        </motion.p>
                        <p className="font-heading font-bold text-pink-600 text-lg">
                          তোমার হাত ধরেই আমার পথ চলা,<br/>
                          তোমার চোখেই আমার পৃথিবী। 🌍
                        </p>
                        <p
                          className="font-cursive text-pink-400 text-xl italic"
                          style={{ fontFamily:'var(--font-dancing), cursive' }}
                        >
                          Forever & Always, my love. 💞
                        </p>

                        {/* Bouncing hearts row */}
                        <div className="flex justify-center gap-2 pt-2">
                          {['💖','💗','❤️','💓','💖','💗','❤️'].map((h,i)=>(
                            <motion.span
                              key={i}
                              className="text-xl"
                              animate={{ y:[0,-12,0], scale:[1,1.3,1] }}
                              transition={{ duration:0.8, repeat:Infinity, delay:i*0.1 }}
                            >
                              {h}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Signature */}
                    <motion.div
                      initial={{ opacity:0, y:12 }}
                      animate={{ opacity:1, y:0 }}
                      transition={{ delay:1.2 }}
                      className="text-center mt-5 space-y-1"
                    >
                      <p
                        className="font-cursive text-pink-500 text-2xl"
                        style={{ fontFamily:'var(--font-dancing), cursive' }}
                      >
                        — Yours forever, Souvik 💌
                      </p>
                      <p className="text-pink-400 text-sm font-medium">
                        তোমাকেই চাই, চিরকালের জন্য। 🌹
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pb-16" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════
          SECTION HEADER
      ════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity:0, y:20 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        className="text-center mb-10"
      >
        <span className="text-4xl block mb-2 float">💍</span>
        <h2 className="font-heading font-black text-3xl md:text-4xl gradient-text-love glow-text">
          একটাই কথা বলার আছে…
        </h2>
        <p className="font-cursive text-pink-400 text-lg mt-2" style={{ fontFamily:'var(--font-dancing), cursive' }}>
          The most important thing I&apos;ll ever say... 🌹
        </p>
      </motion.div>

      {/* ════════════════════════════════════════════════════
          PROPOSAL CARD / TEASER BUTTON
      ════════════════════════════════════════════════════ */}
      <div className="w-full max-w-sm mx-auto">
        <AnimatePresence mode="wait">
          {stage === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity:0, scale:0.85 }}
              animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale:0.4, y:-60 }}
              transition={{ type:'spring' }}
              className="flex flex-col items-center gap-5"
            >
              <div className="glass-dark px-6 py-5 rounded-3xl border-2 border-white/60 text-center">
                <p className="font-cursive text-pink-600 text-xl" style={{ fontFamily:'var(--font-dancing), cursive' }}>
                  &quot;অনেকদিন ধরে একটা কথা বলতে চাইছিলাম…&quot; 💖
                </p>
              </div>
              <motion.button
                onClick={handleOpenProposal}
                whileHover={{ scale:1.08, rotate:-1 }}
                whileTap={{ scale:0.93 }}
                className="shimmer bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 px-10 py-5 rounded-[3rem] text-white font-heading font-black text-xl shadow-[0_15px_40px_rgba(255,105,180,0.5)] border-4 border-white/70 flex items-center gap-4 glow-box"
              >
                <Heart size={26} className="fill-white heartbeat" />
                আমার Secret টা দেখো ✨
              </motion.button>
              <p className="text-pink-400 text-sm font-medium animate-pulse">
                শুধু তোমার জন্য, Inddu… 🌸
              </p>
            </motion.div>
          )}

          {stage === 'proposal' && (
            <motion.div
              key="proposal"
              initial={{ opacity:0, scale:0.15, rotate:-20 }}
              animate={{ opacity:1, scale:1, rotate:0 }}
              transition={{ type:'spring', damping:10, stiffness:70 }}
              className="w-full"
            >
              <div className="relative bg-white w-full rounded-[3rem] overflow-hidden border-4 border-pink-200 shadow-[0_30px_80px_rgba(255,105,180,0.4)]">
                <div className="h-4 w-full shimmer"
                  style={{ background:'linear-gradient(90deg,#ffd1dc,#ff69b4,#ff1493,#ff69b4,#ffd1dc)' }} />

                <div className="px-7 py-7 text-center space-y-5">
                  <motion.div
                    animate={{ scale:[1,1.3,1], rotate:[0,12,-12,0] }}
                    transition={{ repeat:Infinity, duration:1.8, ease:'easeInOut' }}
                    className="flex justify-center"
                  >
                    <Heart
                      className="w-20 h-20 text-pink-500 fill-pink-400"
                      style={{ filter:'drop-shadow(0 0 20px rgba(255,105,180,0.9))' }}
                    />
                  </motion.div>

                  <div className="space-y-3 text-left">
                    {PROPOSAL_LINES.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity:0, x:-20 }}
                        animate={{ opacity:1, x:0 }}
                        transition={{ delay: 0.15*i + 0.3 }}
                        className="space-y-0.5"
                      >
                        {line.bn && <p className="font-heading font-bold text-pink-700 text-[17px] leading-snug">{line.bn}</p>}
                        {line.en && (
                          <p className="font-cursive text-pink-400 text-base italic"
                            style={{ fontFamily:'var(--font-dancing), cursive' }}>
                            {line.en}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* The big question */}
                  <motion.div
                    initial={{ opacity:0, scale:0.5 }}
                    animate={{ opacity:1, scale:1 }}
                    transition={{ delay:1.8, type:'spring' }}
                    className="glass-dark p-6 rounded-3xl border-2 border-pink-200"
                  >
                    <p className="font-heading font-bold text-pink-600 text-sm mb-3">
                      তাই আজ, আমার জীবনের সবচেয়ে গুরুত্বপূর্ণ প্রশ্ন —
                    </p>
                    <motion.p
                      animate={{ scale:[1,1.05,1] }}
                      transition={{ duration:2, repeat:Infinity }}
                      className="font-heading font-black text-3xl md:text-4xl gradient-text-love glow-text"
                    >
                      তুমি কি আমাকে বিয়ে করবে? 💍❤️
                    </motion.p>
                    <p className="font-cursive text-pink-400 text-lg mt-3 italic"
                      style={{ fontFamily:'var(--font-dancing), cursive' }}>
                      Will you marry me, my love? 🌹
                    </p>
                  </motion.div>

                  {/* YES / FOREVER */}
                  <motion.div
                    initial={{ opacity:0, y:20 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay:2.5 }}
                    className="flex gap-3 justify-center"
                  >
                    <motion.button
                      whileHover={{ scale:1.13, rotate:-2 }}
                      whileTap={{ scale:0.92 }}
                      onClick={handleYes}
                      className="shimmer bg-gradient-to-r from-pink-400 to-rose-500 text-white font-heading font-black px-8 py-3 rounded-full shadow-[0_8px_30px_rgba(255,105,180,0.55)] border-2 border-white flex items-center gap-2 glow-box"
                    >
                      <Heart size={17} className="fill-white heartbeat" /> হ্যাঁ! 💖
                    </motion.button>
                    <motion.button
                      whileHover={{ scale:1.13, rotate:2 }}
                      whileTap={{ scale:0.92 }}
                      onClick={handleYes}
                      className="glass border-2 border-pink-300 text-pink-600 font-heading font-black px-8 py-3 rounded-full shadow-lg"
                    >
                      Forever! ✨
                    </motion.button>
                  </motion.div>
                </div>

                <div className="h-4 w-full shimmer"
                  style={{ background:'linear-gradient(90deg,#ffd1dc,#ff69b4,#ff1493,#ff69b4,#ffd1dc)' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
