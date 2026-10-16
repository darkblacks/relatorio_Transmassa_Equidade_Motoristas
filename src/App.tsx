import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import {
  ArrowDown,
  BarChart3,
  SlidersHorizontal,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  GripVertical,
  RefreshCcw,
  Route,
  ShieldCheck,
  Truck,
  UsersRound,
  X,
} from 'lucide-react';

type Driver = {
  name: string;
  truck: string;
  trailer: string;
  region: string;
};

const ORIGINAL_QUEUE: Driver[] = [
  { name: 'Giovanilton Brito De Freitas', truck: 'FDZ0C43', trailer: 'FJX3581', region: 'SP' },
  { name: 'Ivan Carlos Alves De Oliveira', truck: 'FPB7D72', trailer: 'FDB7956', region: 'SP' },
  { name: 'Izaias Fraga', truck: 'GEX7J17', trailer: 'MFE8782', region: 'SP' },
  { name: 'Jose Elves Matias', truck: 'FWI6H66', trailer: 'AHQ0113', region: 'SP' },
  { name: 'Joselito Ferreira De Lima', truck: 'FPX1E68', trailer: 'FDZ5D94', region: 'SP' },
  { name: 'Luciano Oliveira Santana', truck: 'FXS5J85', trailer: 'GDU1108', region: 'SP' },
  { name: 'Nelson Godoy', truck: 'FWB9C19', trailer: 'FDZ0244', region: 'SP' },
  { name: 'Robson Jose Da Silva', truck: 'FVB3J92', trailer: 'FDP6054', region: 'SP' },
  { name: 'Rogerio Da Silva Alves', truck: 'FXB0I17', trailer: 'FVV7H20', region: 'SP' },
  { name: 'Roni Carlos Pereira De Souza', truck: 'GJU1B26', trailer: 'GCT3159', region: 'SP' },
  { name: 'Sergio Luz Silva', truck: 'EVO9750', trailer: 'DJC9B01', region: 'SP' },
  { name: 'Valter Nunes Ribeiro', truck: 'FDZ0231', trailer: 'FDZ0C32', region: 'SP' },
  { name: 'Edijanio', truck: 'FDZ2272', trailer: 'IMZ0563', region: 'SP' },
  { name: 'Luiz Augusto', truck: 'GJS0078', trailer: 'FDB7954', region: 'SP' },
  { name: 'Alexandre', truck: 'FDZ0040', trailer: 'MJY0H84', region: 'SP' },
  { name: 'Antonio', truck: 'EWJ4188', trailer: 'EPU6691', region: 'SP' },
  { name: 'Jadilson', truck: 'BFZ8509', trailer: 'MCT1I39', region: 'SP' },
  { name: 'Alan', truck: 'HYE7D75', trailer: 'FCY0418', region: 'SP' },
  { name: 'Jason', truck: 'MTV0D08', trailer: 'MJC8F48', region: 'SP' },
  { name: 'Diego Justino Ribeiro', truck: 'UQQ9I10', trailer: 'MKO7332', region: 'SP' },
];

const slideLabels = ['Apresentação', 'O modelo', 'Na prática', 'Relatórios', 'Obrigado'];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`}>
      <img src="/assets/transmassa-logo.png" alt="Transmassa Logística" />
    </div>
  );
}

function Topbar({ index, setIndex }: { index: number; setIndex: (value: number) => void }) {
  return (
    <header className="topbar">
      <BrandMark compact />
      <nav className="topbar__nav" aria-label="Navegação da apresentação">
        {slideLabels.map((label, i) => (
          <button
            key={label}
            className={i === index ? 'is-active' : ''}
            onClick={() => setIndex(i)}
          >
            <span>{String(i + 1).padStart(2, '0')}</span>
            {label}
          </button>
        ))}
      </nav>
      <div className="topbar__count">{index + 1} / 5</div>
    </header>
  );
}

function SlideShell({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.main
      className="slide"
      key={index}
      initial={{ opacity: 0, x: 34, scale: 0.992 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -30, scale: 0.992 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

function Cover() {
  return (
    <div className="cover">
      <div className="cover__visual">
        <div className="globe-grid" />
        <div className="cover__logo"><BrandMark /></div>
        <div className="cover__badge"><RefreshCcw size={18} /> Escala com rotatividade</div>
      </div>
      <section className="cover__content">
        <span className="eyebrow">APRESENTAÇÃO OPERACIONAL</span>
        <h1>Escala de motoristas<br /><em>mais justa, simples e rastreável.</em></h1>
        <p>
          Um modelo de fila operacional para distribuir serviços com rotatividade, registrar exceções e dar transparência à decisão do roteirista.
        </p>
        <div className="cover__rule">
          <span>Objetivo</span>
          <strong>O próximo motorista disponível entra primeiro na oportunidade.</strong>
        </div>
      </section>
    </div>
  );
}

function ModelSlide() {
  return (
    <div className="page-grid page-grid--model">
      <section className="page-copy">
        <span className="eyebrow">02 — O MODELO</span>
        <h2>Uma fila viva.<br />Uma ordem justa.</h2>
        <p>
          Os motoristas aparecem em ordem de prioridade. Cada empenho envia imediatamente o motorista ao final da fila, promovendo a rotatividade.
        </p>

        <div className="steps">
          <div className="step-card">
            <div className="step-card__icon"><Route size={22} /></div>
            <div><small>01</small><strong>Ordem de prioridade</strong><span>O primeiro motorista da lista é o próximo da escala.</span></div>
          </div>
          <div className="step-card">
            <div className="step-card__icon"><GripVertical size={22} /></div>
            <div><small>02</small><strong>Empenhar motorista</strong><span>Ao clicar em Empenhar, o motorista vai imediatamente para o fim da fila.</span></div>
          </div>
          <div className="step-card">
            <div className="step-card__icon"><ArrowDown size={22} /></div>
            <div><small>03</small><strong>Exceção justificada</strong><span>Pular a ordem da fila ou usar a seta exige justificativa.</span></div>
          </div>
        </div>
      </section>

      <section className="model-demo" aria-label="Exemplo visual da fila">
        <div className="service-card service-card--mini">
          <div className="service-card__tag">SERVIÇO DA VEZ</div>
          <div>
            <strong>Transferência • SP → RJ</strong>
            <span>14:00 · Carreta · prioridade operacional</span>
          </div>
          <Truck size={28} />
        </div>
        <div className="queue-stack">
          {ORIGINAL_QUEUE.slice(0, 4).map((driver, i) => (
            <motion.div className={`queue-row ${i === 0 ? 'queue-row--first' : ''}`} key={driver.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .06 }}>
              <span className="queue-row__position">{String(i + 1).padStart(2, '0')}</span>
              <div><strong>{driver.name}</strong><span>{driver.truck} · {driver.trailer}</span></div>
              {i === 0 ? <span className="pill pill--red">próximo</span> : <ChevronRight size={18} />}
            </motion.div>
          ))}
        </div>
        <div className="model-demo__foot"><ShieldCheck size={18} /> Empenhos seguem a ordem; exceções exigem justificativa.</div>
      </section>
    </div>
  );
}

type PendingAction = { kind: 'bottom' | 'skip'; driver: Driver };

function PracticeSlide() {
  // Demonstração local: empenhar reposiciona imediatamente o motorista ao fim da fila.
  const [queue, setQueue] = useState<Driver[]>(() => [...ORIGINAL_QUEUE]);
  const [pending, setPending] = useState<PendingAction | null>(null);
  const [reason, setReason] = useState('');
  const [lastAction, setLastAction] = useState('Fila pronta para operação.');
  const [assignments, setAssignments] = useState(0);

  const assign = (driver: Driver, bypass = false) => {
    if (!queue.some(item => item.name === driver.name)) return;
    if (queue[0]?.name !== driver.name && !bypass) {
      setPending({ kind: 'skip', driver });
      setReason('');
      return;
    }
    setQueue(current => [...current.filter(item => item.name !== driver.name), driver]);
    setAssignments(value => value + 1);
    setLastAction(`${driver.name} empenhado e enviado ao fim da fila${bypass ? ' (quebra de ordem justificada)' : ''}.`);
  };
  const confirmReason = () => {
    if (!pending || !reason.trim()) return;
    if (pending.kind === 'bottom') {
      setQueue(current => [...current.filter(item => item.name !== pending.driver.name), pending.driver]);
      setLastAction(`${pending.driver.name} movido ao fim da fila (justificativa informada).`);
    } else {
      assign(pending.driver, true);
    }
    setPending(null);
    setReason('');
  };
  const reset = () => {
    setQueue([...ORIGINAL_QUEUE]);
    setPending(null);
    setReason('');
    setAssignments(0);
    setLastAction('Fila reiniciada.');
  };
  return (
    <div className="practice-page">
      <div className="practice-head">
        <div>
          <span className="eyebrow">03 — NA PRÁTICA</span>
          <h2>Fila operacional interativa</h2>
          <p>Empenhe um motorista e ele vai imediatamente para o fim da fila. Sem criar demandas ou manifestos.</p>
        </div>
        <button className="ghost-button" onClick={reset}><RefreshCcw size={17} /> Reiniciar demo</button>
      </div>
      <div className="practice-grid">
        <section className="driver-list">
          <div className="driver-list__header"><span>ORDEM</span><span>MOTORISTA / CONJUNTO</span><span>REGIÃO</span><span>AÇÕES</span></div>
          <AnimatePresence initial={false}>
            {queue.map((driver, i) => (
              <motion.div layout
                className={`driver-row ${i === 0 ? 'driver-row--next' : ''}`} key={driver.name}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }}>
                <div className="driver-row__order"><GripVertical size={16} /><strong>{String(i + 1).padStart(2, '0')}</strong></div>
                <div className="driver-row__person"><strong>{driver.name}</strong><span>{driver.truck} · {driver.trailer}</span></div>
                <span className="pill">{driver.region}</span>
                <div className="driver-row__actions">
                  <button className="assign-button" onClick={() => assign(driver)}
                    title={i === 0 ? 'Empenhar e enviar ao fim da fila' : 'Empenhar fora da vez (exige justificativa)'}>
                    <Check size={16} /> Empenhar</button>
                  <button className="down-button" onClick={() => { setPending({ kind: 'bottom', driver }); setReason(''); }} title="Enviar ao fim da fila com justificativa"><ArrowDown size={17} /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
        <aside className="practice-side">
          <div className="status-card"><small>PRINCÍPIO DA ESCALA</small><strong>Empenhou? Vai para o fim da fila.</strong>
            <p>O primeiro motorista é empenhado com um clique. Escolher alguém fora da vez exige justificativa.</p></div>
          <div className="audit-card"><div className="audit-card__title"><Clock3 size={18} /> Última movimentação (demo)</div><p>{lastAction}</p></div>
          <div className="mini-metrics"><div><UsersRound size={18} /><strong>{queue.length}</strong><span>na fila</span></div><div><Truck size={18} /><strong>{assignments}</strong><span>empenhos na demo</span></div></div>
        </aside>
      </div>
      <AnimatePresence>
        {pending && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="modal" role="dialog" aria-modal="true" aria-labelledby="reason-title" initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }}>
            <button className="modal__close" onClick={() => setPending(null)} aria-label="Fechar"><X size={18} /></button>
            <h3 id="reason-title">Justificativa</h3>
            <p>{pending.kind === 'skip' ? 'Por que está pulando a fila?' : `Por que enviar ${pending.driver.name} para o final da fila?`}</p>
            <label className="reason-label" htmlFor="reason-text">JUSTIFICATIVAS:</label>
            <textarea id="reason-text" rows={4} value={reason} onChange={event => setReason(event.target.value)} placeholder="Digite a justificativa..." autoFocus />
            <button className="modal__confirm" disabled={!reason.trim()} onClick={confirmReason}>Confirmar <ArrowRight size={17} /></button>
            <small className="reason-footnote">Apenas demonstração. Nada é salvo.</small>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

// Dados ilustrativos para a apresentação — sem integração com banco de dados.
const REPORT_DATA = ORIGINAL_QUEUE.map((driver, index) => ({
  name: driver.name,
  short: driver.name.split(' ').slice(0, 2).join(' '),
  trips: [18, 23, 16, 21, 19, 25, 17, 21, 20, 18, 24, 22, 19, 21, 17, 20, 23, 18, 22, 19][index],
  nights: [5, 8, 4, 7, 6, 9, 4, 7, 6, 5, 8, 6, 5, 7, 4, 6, 8, 5, 7, 6][index],
}));

function ReportsSlide() {
  const [chosen, setChosen] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const selection = chosen.length === 0 ? REPORT_DATA : REPORT_DATA.filter(item => chosen.includes(item.name));
  const avg = REPORT_DATA.reduce((sum, item) => sum + item.trips, 0) / REPORT_DATA.length;
  const avgNights = REPORT_DATA.reduce((sum, item) => sum + item.nights, 0) / REPORT_DATA.length;
  const commonGrid = { left: 45, right: 24, top: 26, bottom: 110 };
  const tripsOption = {
    animationDuration: 650,
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: commonGrid,
    xAxis: { type: 'category', data: REPORT_DATA.map(item => item.short), axisLabel: { rotate: 52, fontSize: 9, color: '#635a56', interval: 0 }, axisLine: { lineStyle: { color: '#e8e0dc' } }, axisTick: { show: false } },
    yAxis: { type: 'value', name: 'Viagens', minInterval: 1, splitLine: { lineStyle: { color: '#f0ebe8' } } },
    series: [{
      name: 'Viagens', type: 'bar', barMaxWidth: 35,
      data: REPORT_DATA.map(item => item.trips),
      itemStyle: { color: '#e2371d', borderRadius: [7, 7, 0, 0] },
      label: { show: true, position: 'top', fontWeight: 'bold', color: '#6d332a' },
      markLine: {
        symbol: 'none', silent: true,
        data: [{ yAxis: avg, name: 'Média' }],
        lineStyle: { color: '#24201f', width: 2, type: 'dashed' },
        label: { show: true, formatter: `Média: ${avg.toFixed(1).replace('.', ',')}`, color: '#24201f', fontWeight: 'bold', position: 'insideEndTop' },
      },
    }],
  };
  const nightsOption = {
    animationDuration: 650,
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: commonGrid,
    xAxis: { type: 'category', data: selection.map(item => item.short), axisLabel: { rotate: 52, fontSize: 9, color: '#635a56', interval: 0 }, axisLine: { lineStyle: { color: '#e8e0dc' } }, axisTick: { show: false } },
    yAxis: { type: 'value', name: 'Pernoites', minInterval: 1, splitLine: { lineStyle: { color: '#f0ebe8' } } },
    series: [{
      name: 'Pernoites', type: 'bar', barMaxWidth: 35,
      data: selection.map(item => item.nights),
      itemStyle: { color: '#e2371d', borderRadius: [7, 7, 0, 0] },
      label: { show: true, position: 'top', fontWeight: 'bold', color: '#6d332a' },
      markLine: {
        symbol: 'none', silent: true,
        data: [{ yAxis: avgNights, name: 'Média' }],
        lineStyle: { color: '#24201f', width: 2, type: 'dashed' },
        label: { show: true, formatter: `Média: ${avgNights.toFixed(1).replace('.', ',')}`, color: '#24201f', fontWeight: 'bold', position: 'insideEndTop' },
      },
    }],
  };
  const toggle = (name: string) => {
    setChosen(current => {
      if (current.length === 0) return [name];
      const next = current.includes(name) ? current.filter(item => item !== name) : [...current, name];
      return next.length === REPORT_DATA.length ? [] : next;
    });
  };
  return (
    <div className="reports-page">
      <div className="reports-heading">
        <span className="eyebrow">04 — RELATÓRIOS</span>
        <h2>Relatórios que podem ser gerados</h2>
        <p>Uma visão gerencial da distribuição das viagens e dos pernoites por motorista.</p>
      </div>
      <div className="reports-grid">
        <section className="report-panel">
          <div className="report-panel__heading"><div className="report-panel__icon"><BarChart3 size={19} /></div><div><h3>Nível de Equidade de Serviço</h3><p>Quantidade de viagens por motorista e linha de média geral.</p></div></div>
          <ReactECharts option={tripsOption} notMerge style={{ height: 320, width: '100%' }} />
          <div className="report-panel__footer"><span><i className="legend-dot legend-dot--red" /> Viagens realizadas</span><span><i className="legend-line" /> Média da equipe</span></div>
        </section>
        <section className="report-panel">
          <div className="report-panel__heading report-panel__heading--spread"><div className="report-panel__heading-title"><div className="report-panel__icon"><BarChart3 size={19} /></div><div><h3>Equidade de Pernoites por Motorista</h3><p>Pernoites por motorista e linha de média da equipe.</p></div></div>
            <div className="report-filter"><button type="button" onClick={() => setFilterOpen(value => !value)} aria-expanded={filterOpen} aria-label="Selecionar motoristas"><SlidersHorizontal size={16} /> {chosen.length === 0 ? 'Todos' : `${chosen.length} selecionado(s)`}</button>
              {filterOpen && <div className="report-filter__menu"><button className="report-filter__all" onClick={() => { setChosen([]); setFilterOpen(false); }}>✓ Todos os motoristas</button>{REPORT_DATA.map(item => <label key={item.name}><input type="checkbox" checked={chosen.length === 0 || chosen.includes(item.name)} onChange={() => toggle(item.name)} /> <span>{item.name}</span></label>)}</div>}
            </div>
          </div>
          <ReactECharts option={nightsOption} notMerge style={{ height: 320, width: '100%' }} />
          <div className="report-panel__footer"><span><i className="legend-dot legend-dot--red" /> Pernoites realizados</span><span><i className="legend-line" /> Média da equipe</span></div>
        </section>
      </div>
      <div className="reports-disclaimer">Valores demonstrativos, utilizados apenas para ilustrar os relatórios na apresentação.</div>
    </div>
  );
}

function ThanksSlide() {
  return (
    <div className="thanks">
      <div className="thanks__orb"><div className="globe-grid globe-grid--strong" /></div>
      <div className="thanks__content">
        <BrandMark />
        <span className="eyebrow">05 — ENCERRAMENTO</span>
        <h2>Obrigado.</h2>
        <p>Uma escala simples para transformar ordem de fila em <strong>rotatividade, transparência e disciplina operacional.</strong></p>
        <div className="thanks__benefits">
          <span><RefreshCcw size={18} /> Mais rotatividade</span>
          <span><ShieldCheck size={18} /> Mais rastreabilidade</span>
          <span><Clock3 size={18} /> Menos decisão manual</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [index, setIndex] = useState(0);
  const slides = useMemo(() => [<Cover />, <ModelSlide />, <PracticeSlide />, <ReportsSlide />, <ThanksSlide />], []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') setIndex(current => Math.min(4, current + 1));
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') setIndex(current => Math.max(0, current - 1));
      if (event.key === 'Home') setIndex(0);
      if (event.key === 'End') setIndex(4);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="app-shell">
      <Topbar index={index} setIndex={setIndex} />
      <AnimatePresence mode="wait">
        <SlideShell index={index}>{slides[index]}</SlideShell>
      </AnimatePresence>
      <div className="floating-nav">
        <button onClick={() => setIndex(current => Math.max(0, current - 1))} disabled={index === 0}><ChevronLeft size={20} /></button>
        <div><span>{String(index + 1).padStart(2, '0')}</span><i /><span>05</span></div>
        <button onClick={() => setIndex(current => Math.min(4, current + 1))} disabled={index === 4}><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}
