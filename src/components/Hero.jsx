import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/* Sort generators — each yields { array, highlights, done? }        */
/* highlights: { [index]: 'compare' | 'swap' | 'pivot' | 'merge' | 'sorted' } */
/* ------------------------------------------------------------------ */

function markAllSorted(a) {
  const h = {};
  for (let i = 0; i < a.length; i++) h[i] = 'sorted';
  return { array: a.slice(), highlights: h, done: true };
}

function* bubbleSortGen(arr) {
  const a = arr.slice();
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { array: a.slice(), highlights: { [j]: 'compare', [j + 1]: 'compare' } };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { array: a.slice(), highlights: { [j]: 'swap', [j + 1]: 'swap' } };
      }
    }
    yield { array: a.slice(), highlights: { [n - i - 1]: 'sorted' } };
  }
  yield markAllSorted(a);
}

function* insertionSortGen(arr) {
  const a = arr.slice();
  const n = a.length;
  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;
    yield { array: a.slice(), highlights: { [i]: 'compare' } };
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      yield { array: a.slice(), highlights: { [j]: 'swap', [j + 1]: 'swap' } };
      j--;
    }
    a[j + 1] = key;
    yield { array: a.slice(), highlights: { [j + 1]: 'sorted' } };
  }
  yield markAllSorted(a);
}

function* selectionSortGen(arr) {
  const a = arr.slice();
  const n = a.length;
  for (let i = 0; i < n; i++) {
    let min = i;
    yield { array: a.slice(), highlights: { [i]: 'pivot' } };
    for (let j = i + 1; j < n; j++) {
      yield { array: a.slice(), highlights: { [min]: 'pivot', [j]: 'compare' } };
      if (a[j] < a[min]) min = j;
    }
    [a[i], a[min]] = [a[min], a[i]];
    yield { array: a.slice(), highlights: { [i]: 'sorted' } };
  }
  yield markAllSorted(a);
}

function* mergeSortGen(arr) {
  const a = arr.slice();
  function* helper(l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    yield* helper(l, m);
    yield* helper(m + 1, r);
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      yield { array: a.slice(), highlights: { [k]: 'compare' } };
      if (left[i] <= right[j]) { a[k] = left[i]; i++; } else { a[k] = right[j]; j++; }
      yield { array: a.slice(), highlights: { [k]: 'merge' } };
      k++;
    }
    while (i < left.length) { a[k] = left[i]; yield { array: a.slice(), highlights: { [k]: 'merge' } }; i++; k++; }
    while (j < right.length) { a[k] = right[j]; yield { array: a.slice(), highlights: { [k]: 'merge' } }; j++; k++; }
  }
  yield* helper(0, a.length - 1);
  yield markAllSorted(a);
}

function* quickSortGen(arr) {
  const a = arr.slice();
  function* qs(lo, hi) {
    if (lo >= hi) return;
    const pivot = a[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      yield { array: a.slice(), highlights: { [j]: 'compare', [hi]: 'pivot' } };
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        yield { array: a.slice(), highlights: { [i]: 'swap', [j]: 'swap', [hi]: 'pivot' } };
      }
    }
    [a[i + 1], a[hi]] = [a[hi], a[i + 1]];
    yield { array: a.slice(), highlights: { [i + 1]: 'sorted' } };
    yield* qs(lo, i);
    yield* qs(i + 2, hi);
  }
  yield* qs(0, a.length - 1);
  yield markAllSorted(a);
}

function* heapSortGen(arr) {
  const a = arr.slice();
  const n = a.length;
  function* heapify(size, i) {
    let largest = i;
    const l = 2 * i + 1, r = 2 * i + 2;
    if (l < size) {
      yield { array: a.slice(), highlights: { [largest]: 'compare', [l]: 'compare' } };
      if (a[l] > a[largest]) largest = l;
    }
    if (r < size) {
      yield { array: a.slice(), highlights: { [largest]: 'compare', [r]: 'compare' } };
      if (a[r] > a[largest]) largest = r;
    }
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      yield { array: a.slice(), highlights: { [i]: 'swap', [largest]: 'swap' } };
      yield* heapify(size, largest);
    }
  }
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) yield* heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    yield { array: a.slice(), highlights: { [i]: 'sorted' } };
    yield* heapify(i, 0);
  }
  yield markAllSorted(a);
}

const ALGORITHMS = {
  bubble: { label: 'bubbleSort()', gen: bubbleSortGen, time: 'O(n²)', space: 'O(1)', best: 'O(n)' },
  insertion: { label: 'insertionSort()', gen: insertionSortGen, time: 'O(n²)', space: 'O(1)', best: 'O(n)' },
  selection: { label: 'selectionSort()', gen: selectionSortGen, time: 'O(n²)', space: 'O(1)', best: 'O(n²)' },
  merge: { label: 'mergeSort()', gen: mergeSortGen, time: 'O(n log n)', space: 'O(n)', best: 'O(n log n)' },
  quick: { label: 'quickSort()', gen: quickSortGen, time: 'O(n log n)', space: 'O(log n)', best: 'O(n log n)' },
  heap: { label: 'heapSort()', gen: heapSortGen, time: 'O(n log n)', space: 'O(1)', best: 'O(n log n)' },
};

const HIGHLIGHT_COLOR = {
  compare: '#fbbf24',
  swap: '#fb7185',
  pivot: '#a78bfa',
  merge: '#38bdf8',
  sorted: '#34d399',
};

function genRandomArray(size, max) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - 30)) + 30);
}

const TYPING_STRINGS = ['Competitive Programmer', 'Algorithm Enthusiast', 'Full-Stack Developer', 'Problem Solver'];
const TYPING_SPEED = 80;    
const DELETING_SPEED = 40;  
const VISIBLE_PAUSE = 1500; 
const SWITCH_DELAY = 300;   

/* ---------------- -------------------------------------------------- */

export default function Hero() {
  const canvasRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_STRINGS[stringIndex];
    let timer;
    let dynamicDelay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === current.length) {
      timer = setTimeout(() => setIsDeleting(true), VISIBLE_PAUSE);
      return () => clearTimeout(timer);
    } 
    
    if (isDeleting && charIndex === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % TYPING_STRINGS.length);
      }, SWITCH_DELAY);
      return () => clearTimeout(timer);
    }

    timer = setTimeout(() => {
      setTypedText(current.substring(0, isDeleting ? charIndex - 1 : charIndex + 1));
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
    }, dynamicDelay);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, stringIndex]);

  /* ---------------- visualizer state ---------------- */
  const [algoKey, setAlgoKey] = useState('bubble');
  const [arraySize, setArraySize] = useState(40);
  const [speed, setSpeed] = useState(45);        
  const [isPlaying, setIsPlaying] = useState(true);
  const [shuffleTick, setShuffleTick] = useState(0);
  const [opCount, setOpCount] = useState(0);

  const genRef = useRef(null);
  const arrRef = useRef([]);
  const highlightRef = useRef({});
  const doneRef = useRef(false);
  const opCountRef = useRef(0);
  const playingRef = useRef(isPlaying);
  const speedRef = useRef(speed);
  const restartTimeoutRef = useRef(null);

  useEffect(() => { playingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const maxHeight = canvas ? canvas.height || 380 : 380;
    const arr = genRandomArray(arraySize, maxHeight);
    arrRef.current = arr;
    genRef.current = ALGORITHMS[algoKey].gen(arr);
    highlightRef.current = {};
    doneRef.current = false;
    opCountRef.current = 0;
    setOpCount(0);
    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
  }, [algoKey, arraySize, shuffleTick]);

  const triggerShuffle = useCallback(() => setShuffleTick((t) => t + 1), []);

  // Persistent render / step loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 380;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      const bars = arrRef.current;
      const highlights = highlightRef.current;
      const n = bars.length || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const style = getComputedStyle(canvas);
      const computedDefaultColor = style.getPropertyValue('--bar-default').trim() || 'rgba(34, 211, 238, 0.38)';
      const textFillColor = style.getPropertyValue('--text-canvas-info').trim() || 'rgba(255,255,255,0.32)';
      const gridColor = style.getPropertyValue('--canvas-grid').trim() || 'rgba(255,255,255,0.02)';

      const barWidth = canvas.width / n;
      for (let k = 0; k < n; k++) {
        const h = bars[k];
        const x = k * barWidth;
        const y = canvas.height - h;
        ctx.fillStyle = HIGHLIGHT_COLOR[highlights[k]] || computedDefaultColor;
        ctx.fillRect(x + 1, y, Math.max(barWidth - 2, 1), h);
      }

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }

      ctx.fillStyle = textFillColor;
      ctx.font = '12px "Fira Code", monospace';
      ctx.fillText(`algorithm: ${ALGORITHMS[algoKey].label}`, 16, 24);
      ctx.fillText(`operations: ${opCountRef.current}`, 16, 42);
      ctx.fillText(`n: ${n}`, 16, 60);
    };

    const loop = () => {
      rafId = requestAnimationFrame(loop);

      if (playingRef.current && !doneRef.current && genRef.current) {
        const stepsPerFrame = Math.max(1, Math.round(speedRef.current / 8));
        for (let s = 0; s < stepsPerFrame; s++) {
          const result = genRef.current.next();
          if (result.done) break;
          arrRef.current = result.value.array;
          highlightRef.current = result.value.highlights;
          opCountRef.current += 1;
          
          if (result.value.done) {
            doneRef.current = true;
            // Transition smoothly to the next algorithm in the circle sequence
            restartTimeoutRef.current = setTimeout(() => {
              if (playingRef.current) {
                setAlgoKey((currentKey) => {
                  const keys = Object.keys(ALGORITHMS);
                  const nextIndex = (keys.indexOf(currentKey) + 1) % keys.length;
                  return keys[nextIndex];
                });
              }
            }, 1400);
            break;
          }
        }
        setOpCount(opCountRef.current);
      }
      draw();
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
    };
  }, [algoKey]); // Removed triggerShuffle dependency since setAlgoKey updates the workflow now

  const info = ALGORITHMS[algoKey];

  return (
    <section className="avz-hero">
      <style>{`
        /* --- DEFAULT (DARK MODE) VALUES --- */
        .avz-hero {
          --bg: #0a0e17;
          --panel: #10141f;
          --panel-header: #0d1119;
          --cyan: #22d3ee;
          --gold: #fbbf24;
          --emerald: #34d399;
          --violet: #a78bfa;
          --rose: #fb7185;
          --text: #e2e8f0;
          --text-muted: rgba(226,232,240,0.55);
          --bar-default: rgba(34, 211, 238, 0.38);
          --text-canvas-info: rgba(255, 255, 255, 0.32);
          --canvas-grid: rgba(255,255,255,0.02);
          --btn-secondary-border: rgba(255,255,255,0.15);
          --panel-border: rgba(255,255,255,0.06);
          --pill-bg: rgba(255,255,255,0.02);
          --pill-border: rgba(255,255,255,0.08);

          background: radial-gradient(ellipse at top left, #0d1420 0%, var(--bg) 55%);
          color: var(--text);
          font-family: 'Inter', system-ui, sans-serif;
          padding: 5rem 1.5rem;
          transition: background 0.3s ease, color 0.3s ease;
        }

        /* --- LIGHT MODE OVERRIDES --- */
        :root.light .avz-hero, body.light .avz-hero, [data-theme='light'] .avz-hero {
          --bg: #f8fafc;
          --panel: #ffffff;
          --panel-header: #f1f5f9;
          --cyan: #06b6d4;
          --gold: #d97706;
          --text: #0f172a;
          --text-muted: #64748b;
          --bar-default: rgba(6, 182, 212, 0.35);
          --text-canvas-info: rgba(15, 23, 42, 0.5);
          --canvas-grid: rgba(0,0,0,0.04);
          --btn-secondary-border: rgba(0,0,0,0.15);
          --panel-border: rgba(0,0,0,0.08);
          --pill-bg: rgba(0,0,0,0.02);
          --pill-border: rgba(0,0,0,0.06);
          background: radial-gradient(ellipse at top left, #edf2f7 0%, var(--bg) 55%);
        }

        .avz-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 960px) {
          .avz-container { grid-template-columns: 0.95fr 1.15fr; align-items: center; }
        }
        .avz-badge {
          display: inline-flex; align-items: center; gap: .5rem;
          font-family: 'Fira Code', monospace; font-size: .75rem;
          color: var(--cyan); border: 1px solid rgba(34,211,238,0.3);
          background: rgba(34,211,238,0.07); padding: .35rem .8rem; border-radius: 999px;
          margin-bottom: 1.25rem;
        }
        :root.light .avz-badge, body.light .avz-badge, [data-theme='light'] .avz-badge {
          border-color: rgba(6, 182, 212, 0.3);
          background: rgba(6, 182, 212, 0.05);
        }
        .avz-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 8px var(--cyan); }
        .avz-title { font-size: clamp(2.2rem, 5vw, 3.2rem); font-weight: 700; line-height: 1.1; margin: 0 0 .5rem; }
        .avz-title .accent { color: var(--cyan); }
        .avz-subtitle { font-family: 'Fira Code', monospace; font-size: clamp(1rem, 2.2vw, 1.35rem); color: var(--text-muted); min-height: 1.8em; margin-bottom: 1.25rem; }
        .avz-subtitle .gold { color: var(--gold); }
        .avz-cursor { display: inline-block; width: 2px; background: var(--gold); margin-left: 2px; animation: avz-blink 1s step-end infinite; }
        @keyframes avz-blink { 50% { opacity: 0; } }
        .avz-desc { color: var(--text-muted); line-height: 1.7; max-width: 46ch; margin-bottom: 2rem; font-size: .95rem; }
        .avz-actions { display: flex; gap: .9rem; flex-wrap: wrap; }
        .avz-btn { display: inline-flex; align-items: center; gap: .5rem; padding: .75rem 1.4rem; border-radius: 8px; font-weight: 600; font-size: .9rem; text-decoration: none; transition: transform .15s ease, box-shadow .15s ease; cursor: pointer; border: none; }
        .avz-btn-primary { background: var(--cyan); color: #04141a; box-shadow: 0 0 0 rgba(34,211,238,0); }
        :root.light .avz-btn-primary, body.light .avz-btn-primary, [data-theme='light'] .avz-btn-primary { color: #fff; }
        .avz-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(34,211,238,0.25); }
        .avz-btn-secondary { background: transparent; color: var(--text); border: 1px solid var(--btn-secondary-border); }
        .avz-btn-secondary:hover { border-color: var(--cyan); color: var(--cyan); }

        .avz-panel { background: var(--panel); border: 1px solid var(--panel-border); border-radius: 14px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15); transition: background 0.3s ease, border-color 0.3s ease; }
        .avz-term-header { display: flex; align-items: center; gap: .75rem; padding: .7rem 1rem; background: var(--panel-header); border-bottom: 1px solid var(--panel-border); transition: background 0.3s ease; }
        .avz-term-btns { display: flex; gap: 6px; }
        .avz-term-btn { width: 11px; height: 11px; border-radius: 50%; }
        .avz-term-title { font-family: 'Fira Code', monospace; font-size: .75rem; color: var(--text-muted); }

        .avz-pillrow { display: flex; flex-wrap: wrap; gap: .5rem; padding: .9rem 1rem 0; }
        .avz-pill { font-family: 'Fira Code', monospace; font-size: .72rem; padding: .4rem .7rem; border-radius: 6px; border: 1px solid var(--pill-border); background: var(--pill-bg); color: var(--text-muted); cursor: pointer; transition: all .15s ease; }
        .avz-pill:hover { color: var(--text); border-color: rgba(255,255,255,0.25); }
        :root.light .avz-pill:hover, body.light .avz-pill:hover, [data-theme='light'] .avz-pill:hover { border-color: rgba(0,0,0,0.25); }
        .avz-pill.active { color: #ffffff; background: var(--cyan); border-color: var(--cyan); font-weight: 600; }
        :root.light .avz-pill.active, body.light .avz-pill.active, [data-theme='light'] .avz-pill.active { color: #ffffff; }

        .avz-canvas-wrap { padding: .75rem 1rem 0; }
        .avz-canvas-wrap canvas { width: 100%; display: block; border-radius: 8px; background: rgba(0,0,0,0.02); }
        :root.light .avz-canvas-wrap canvas, body.light .avz-canvas-wrap canvas, [data-theme='light'] .avz-canvas-wrap canvas { background: rgba(0,0,0,0.01); }

        .avz-statrow { display: flex; flex-wrap: wrap; gap: 1.4rem; padding: .8rem 1rem; font-family: 'Fira Code', monospace; font-size: .72rem; color: var(--text-muted); border-top: 1px solid var(--panel-border); }
        .avz-statrow b { color: var(--text); }
        .avz-statrow .c-time { color: var(--gold); }
        .avz-statrow .c-space { color: var(--violet); }

        .avz-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; padding: .9rem 1rem 1.1rem; border-top: 1px solid var(--panel-border); }
        .avz-iconbtn { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 8px; background: var(--pill-bg); border: 1px solid var(--pill-border); color: var(--text); cursor: pointer; }
        .avz-iconbtn:hover { border-color: var(--cyan); color: var(--cyan); }
        .avz-slider-group { display: flex; align-items: center; gap: .5rem; font-family: 'Fira Code', monospace; font-size: .68rem; color: var(--text-muted); }
        .avz-slider-group input[type="range"] { width: 90px; accent-color: var(--cyan); }
      `}</style>

      <div className="avz-container">
        <div>
          <div className="avz-badge"><span className="avz-dot" />Ready to Code &amp; Solve</div>
          <h1 className="avz-title">Hey, I'm <span className="accent">Sakib</span></h1>
          <h2 className="avz-subtitle">
            Passionate <span className="gold">{typedText}</span>
            <span className="avz-cursor">&nbsp;</span>
          </h2>
          <p className="avz-desc">
            I specialize in crafting premium web applications and solving complex algorithmic
            challenges. With a strong background in competitive programming, I write highly
            optimized, clean, and scalable code to turn complex problems into elegant digital
            solutions.
          </p>
          <div className="avz-actions">
            <a href="#projects" className="avz-btn avz-btn-primary">View Projects &rarr;</a>
            <a href="#dashboard" className="avz-btn avz-btn-secondary">Contest Dashboard</a>
          </div>
        </div>

        <div className="avz-panel">
          <div className="avz-term-header">
            <div className="avz-term-btns">
              <span className="avz-term-btn" style={{ background: '#ff5f56' }} />
              <span className="avz-term-btn" style={{ background: '#ffbd2e' }} />
              <span className="avz-term-btn" style={{ background: '#27c93f' }} />
            </div>
            <div className="avz-term-title">live_algorithm_visualizer.js &mdash; {algoKey}.js</div>
          </div>

          <div className="avz-pillrow">
            {Object.entries(ALGORITHMS).map(([key, a]) => (
              <button
                key={key}
                className={`avz-pill ${key === algoKey ? 'active' : ''}`}
                onClick={() => setAlgoKey(key)}
              >
                {a.label}
              </button>
            ))}
          </div>

          <div className="avz-canvas-wrap">
            <canvas ref={canvasRef} />
          </div>

          <div className="avz-statrow">
            <span>operations: <b>{opCount}</b></span>
            <span>time: <b className="c-time">{info.time}</b></span>
            <span>best: <b className="c-time">{info.best}</b></span>
            <span>space: <b className="c-space">{info.space}</b></span>
            <span>n: <b>{arraySize}</b></span>
          </div>

          <div className="avz-controls">
            <button className="avz-iconbtn" onClick={() => setIsPlaying((p) => !p)} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="avz-iconbtn" onClick={triggerShuffle} title="New array">⟳</button>

            <div className="avz-slider-group">
              speed
              <input type="range" min="5" max="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
            </div>

            <div className="avz-slider-group">
              size
              <input type="range" min="10" max="90" value={arraySize} onChange={(e) => setArraySize(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}