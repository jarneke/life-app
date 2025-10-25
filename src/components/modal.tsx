import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Simple modal component — renders children in a centered overlay with click-to-close support
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null; // Don't render anything if modal is closed

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
      onClick={onClose} // Close modal when clicking on overlay
    >
      <div
        className="bg-stone-950/60 backdrop-blur-3xl p-6 rounded-3xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {children}
      </div>
    </div>
  );
}
