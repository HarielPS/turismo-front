type Props = {
    open: boolean;
    onClose: () => void;
  };
  
  export default function PrivacyModal({ open, onClose }: Props) {
    if (!open) return null;
  
    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-detail rounded-lg shadow-lg w-full max-w-2xl p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 hover:text-gray-400"
            onClick={onClose}
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold mb-4">Política de privacidad</h2>
          <p className=" mb-2">
            Respetamos tu privacidad. Solo recolectamos información básica para mejorar la experiencia de usuario.
          </p>
          <p className="">
            No compartimos datos con terceros sin consentimiento. Esta política puede actualizarse.
          </p>
        </div>
      </div>
    );
  }
  