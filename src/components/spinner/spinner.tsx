import './spinner.css';

export function Spinner() {
  return (
    <div className="spinner-container" data-testid="spinner-container">
      <div className="spinner" data-testid="spinner" />
    </div>
  );
}
