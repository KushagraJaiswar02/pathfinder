const TagPill = ({ tag, onClick, active }) => {
  return (
    <button
      onClick={onClick}
      className={`pill transition-all ${
        active 
          ? 'bg-accent text-white' 
          : 'bg-accent-soft text-accent hover:bg-opacity-20'
      }`}
    >
      #{tag}
    </button>
  );
};

export default TagPill;
