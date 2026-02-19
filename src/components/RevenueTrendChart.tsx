import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, DollarSign, BarChart3, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataPoint {
  x: number;
  y: number;
  value: number;
  label: string;
}

type TimePeriod = '7D' | '30D' | '90D' | '1Y';

export const RevenueTrendChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const dataPointsRef = useRef<DataPoint[]>([]);
  const timeRef = useRef(0);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('30D');
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
      setIsHovering(true);

      const chartWidth = rect.width * 0.85;
      const chartHeight = rect.height * 0.85;
      const offsetX = rect.width * 0.08;
      const offsetY = rect.height * 0.05;

      let closestPoint: DataPoint | null = null;
      let minDistance = Infinity;
      dataPointsRef.current.forEach((point) => {
        const px = offsetX + point.x * chartWidth;
        const py = offsetY + chartHeight - (point.y / 100) * chartHeight;
        const distance = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));
        if (distance < minDistance && distance < 30) {
          minDistance = distance;
          closestPoint = point;
        }
      });
      setHoveredPoint(closestPoint);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setHoveredPoint(null);
      setMousePos(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const generateDataPoints = (time: number, period: TimePeriod) => {
      const points: DataPoint[] = [];
      const configs = {
        '7D': { numPoints: 7, labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        '30D': { numPoints: 30, labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`) },
        '90D': { numPoints: 12, labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8', 'Wk 9', 'Wk 10', 'Wk 11', 'Wk 12'] },
        '1Y': { numPoints: 12, labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }
      };
      const config = configs[period];
      for (let i = 0; i < config.numPoints; i++) {
        const progress = i / (config.numPoints - 1);
        const trendValue = 25 + progress * 55;
        const seasonality = Math.sin(progress * Math.PI * 3) * 8;
        const animation = Math.sin(progress * Math.PI * 2 + time * 0.001) * 3;
        const noise = Math.random() * 4 - 2;
        const baseValue = trendValue + seasonality + animation + noise;
        const y = Math.max(15, Math.min(95, baseValue));
        const revenue = Math.round((y / 100) * 150000);
        points.push({ x: progress, y, value: revenue, label: config.labels[i] });
      }
      return points;
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const chartWidth = width * 0.85;
      const chartHeight = height * 0.85;
      const offsetX = width * 0.08;
      const offsetY = height * 0.05;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
      ctx.lineWidth = 1;
      ctx.font = '10px sans-serif';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
      for (let i = 0; i <= 5; i++) {
        const y = offsetY + (chartHeight * (i / 5));
        const value = Math.round(150000 - (i / 5) * 150000);
        ctx.beginPath();
        ctx.moveTo(offsetX, y);
        ctx.lineTo(offsetX + chartWidth, y);
        ctx.stroke();
        const label = value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`;
        ctx.fillText(label, offsetX - 40, y + 4);
      }
    };

    const draw3DLine = (ctx: CanvasRenderingContext2D, points: DataPoint[], width: number, height: number) => {
      if (points.length < 2) return;
      const chartWidth = width * 0.85;
      const chartHeight = height * 0.85;
      const offsetX = width * 0.08;
      const offsetY = height * 0.05;

      ctx.save();
      ctx.shadowColor = 'rgba(34, 197, 94, 0.4)';
      ctx.shadowBlur = 25;
      ctx.shadowOffsetY = 5;

      const gradient = ctx.createLinearGradient(0, offsetY, 0, offsetY + chartHeight);
      gradient.addColorStop(0, 'rgba(34, 197, 94, 0.35)');
      gradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.25)');
      gradient.addColorStop(0.7, 'rgba(147, 51, 234, 0.15)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.03)');

      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY + chartHeight);
      points.forEach((point, index) => {
        const x = offsetX + point.x * chartWidth;
        const y = offsetY + chartHeight - (point.y / 100) * chartHeight;
        if (index === 0) { ctx.lineTo(x, y); } else {
          const prev = points[index - 1];
          const px = offsetX + prev.x * chartWidth;
          const py = offsetY + chartHeight - (prev.y / 100) * chartHeight;
          ctx.bezierCurveTo(px + (x - px) * 0.5, py, px + (x - px) * 0.5, y, x, y);
        }
      });
      ctx.lineTo(offsetX + chartWidth, offsetY + chartHeight);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      points.forEach((point, index) => {
        const x = offsetX + point.x * chartWidth;
        const y = offsetY + chartHeight - (point.y / 100) * chartHeight;
        if (index === 0) { ctx.moveTo(x, y); } else {
          const prev = points[index - 1];
          const px = offsetX + prev.x * chartWidth;
          const py = offsetY + chartHeight - (prev.y / 100) * chartHeight;
          ctx.bezierCurveTo(px + (x - px) * 0.5, py, px + (x - px) * 0.5, y, x, y);
        }
      });
      const lineGrad = ctx.createLinearGradient(offsetX, 0, offsetX + chartWidth, 0);
      lineGrad.addColorStop(0, 'rgba(34, 197, 94, 1)');
      lineGrad.addColorStop(0.5, 'rgba(59, 130, 246, 1)');
      lineGrad.addColorStop(1, 'rgba(147, 51, 234, 1)');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 3;
      ctx.stroke();

      points.forEach((point) => {
        const x = offsetX + point.x * chartWidth;
        const y = offsetY + chartHeight - (point.y / 100) * chartHeight;
        const color = point.x < 0.33 ? 'rgba(34,197,94,' : point.x < 0.66 ? 'rgba(59,130,246,' : 'rgba(147,51,234,';
        const isHov = hoveredPoint && point.x === hoveredPoint.x && point.y === hoveredPoint.y;
        const gr = ctx.createRadialGradient(x, y, 0, x, y, isHov ? 14 : 8);
        gr.addColorStop(0, color + '0.9)');
        gr.addColorStop(1, color + '0)');
        ctx.beginPath(); ctx.arc(x, y, isHov ? 14 : 8, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, isHov ? 5 : 3, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
        if (isHov) {
          ctx.save(); ctx.strokeStyle = color + '0.3)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
          ctx.beginPath(); ctx.moveTo(x, offsetY); ctx.lineTo(x, offsetY + chartHeight); ctx.stroke(); ctx.restore();
        }
      });
      ctx.restore();
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 16;
      dataPointsRef.current = generateDataPoints(timeRef.current, selectedPeriod);
      drawGrid(ctx, w, h);
      draw3DLine(ctx, dataPointsRef.current, w, h);

      if (isHovering && mousePos) {
        const cw = w * 0.85, ch = h * 0.85, ox = w * 0.08, oy = h * 0.05;
        if (mousePos.x >= ox && mousePos.x <= ox + cw && mousePos.y >= oy && mousePos.y <= oy + ch) {
          ctx.save(); ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
          ctx.beginPath(); ctx.moveTo(mousePos.x, oy); ctx.lineTo(mousePos.x, oy + ch); ctx.stroke();
          ctx.restore();
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [selectedPeriod, hoveredPoint, isHovering, mousePos]);

  const periods: { label: string; value: TimePeriod }[] = [
    { label: '7D', value: '7D' },
    { label: '30D', value: '30D' },
    { label: '90D', value: '90D' },
    { label: '1Y', value: '1Y' },
  ];

  const currentRevenue = dataPointsRef.current.length > 0 ? dataPointsRef.current[dataPointsRef.current.length - 1].value : 0;
  const previousRevenue = dataPointsRef.current.length > 1 ? dataPointsRef.current[0].value : 0;
  const growth = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1) : '0';

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-elegant bg-black/40 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-green-400" />
          <span className="text-sm font-medium text-white">Revenue Trend</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3 text-green-400" />
          <span className="text-xs font-semibold text-green-400">+{growth}%</span>
        </div>
      </div>

      {/* Period selector */}
      <div className="flex gap-1 px-4 py-2">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setSelectedPeriod(p.value)}
            className={`px-2 py-1 rounded text-xs font-medium transition-all ${
              selectedPeriod === p.value
                ? 'bg-green-500/80 text-white'
                : 'text-white/50 hover:text-white/80 hover:bg-white/10'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative px-2 pb-3">
        <canvas
          ref={canvasRef}
          className="w-full rounded-lg"
          style={{ height: '220px' }}
        />

        {/* Tooltip */}
        {hoveredPoint && mousePos && (
          <div
            className="absolute pointer-events-none bg-black/80 border border-white/20 rounded-lg px-3 py-2 backdrop-blur-sm"
            style={{ left: Math.min(mousePos.x, 280), top: Math.max(mousePos.y - 60, 10) }}
          >
            <p className="text-xs text-white/60">{hoveredPoint.label}</p>
            <p className="text-sm font-bold text-white">${(hoveredPoint.value / 1000).toFixed(1)}k</p>
          </div>
        )}
      </div>
    </div>
  );
};
