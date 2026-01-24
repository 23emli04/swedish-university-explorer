export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(0, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible);
  
  if (end - start < maxVisible) {
    start = Math.max(0, end - maxVisible);
  }

  for (let i = start; i < end; i++) {
    pages.push(i);
  }

  return (
    <div className="join mt-4 flex justify-center">
      <button
        className="join-item btn btn-sm"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        «
      </button>
      {start > 0 && (
        <>
          <button className="join-item btn btn-sm" onClick={() => onPageChange(0)}>1</button>
          {start > 1 && <button className="join-item btn btn-sm btn-disabled">...</button>}
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          className={`join-item btn btn-sm ${p === page ? 'btn-active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p + 1}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <button className="join-item btn btn-sm btn-disabled">...</button>}
          <button className="join-item btn btn-sm" onClick={() => onPageChange(totalPages - 1)}>
            {totalPages}
          </button>
        </>
      )}
      <button
        className="join-item btn btn-sm"
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        »
      </button>
    </div>
  );
}
