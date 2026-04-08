export default function ColumnHeaders() {
  const headers = ['Club', 'Nation', 'Pos', 'Age', 'League', '#', 'Foot'];

  return (
    <div className="grid grid-cols-7 gap-1.5 px-0.5">
      {headers.map((h) => (
        <div
          key={h}
          className="text-center text-[10px] font-semibold text-slate-500 uppercase tracking-wider py-1"
        >
          {h}
        </div>
      ))}
    </div>
  );
}
