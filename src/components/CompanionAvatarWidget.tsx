import React, { useState, useEffect } from 'react';
import { CompanionAvatar } from '../types';
import { COMPANION_AVATARS } from '../data/gamificationData';
import { sound } from '../utils/audio';
import { Sparkles, MessageSquare, ChevronRight, RefreshCw, UserCheck, Check } from 'lucide-react';

interface Props {
  selectedAvatarId: string;
  onSelectAvatar: (avatarId: string) => void;
  activeLevelKey: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  compact?: boolean;
}

export const CompanionAvatarWidget: React.FC<Props> = ({
  selectedAvatarId,
  onSelectAvatar,
  activeLevelKey,
  compact = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const companion: CompanionAvatar =
    COMPANION_AVATARS.find((a) => a.id === selectedAvatarId) || COMPANION_AVATARS[0];

  const tipsForLevel = companion.tips[activeLevelKey] || companion.tips.level1;
  const currentTip = tipsForLevel[tipIndex % tipsForLevel.length] || companion.tagline;

  const handleNextTip = () => {
    sound.playClick();
    setTipIndex((prev) => (prev + 1) % tipsForLevel.length);
  };

  const handleChoose = (id: string) => {
    sound.playSuccess();
    onSelectAvatar(id);
    setIsModalOpen(false);
  };

  if (compact) {
    return (
      <>
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs border border-amber-300 rounded-xl px-2.5 py-1.5 shadow-xs">
          <button
            onClick={() => {
              sound.playClick();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 group cursor-pointer"
            title="Ganti Avatar Pendamping"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-base shadow-xs group-hover:scale-105 transition-transform">
              {companion.avatarIcon}
            </div>
            <div className="text-left">
              <div className="text-[10px] text-slate-500 font-semibold leading-tight">Pendamping</div>
              <div className="text-xs font-bold text-slate-800 leading-tight group-hover:text-amber-700">
                {companion.name}
              </div>
            </div>
          </button>
        </div>

        {/* Modal Selection */}
        {isModalOpen && (
          <AvatarSelectionModal
            currentAvatarId={companion.id}
            onSelect={handleChoose}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-amber-50 via-orange-50/60 to-white border border-amber-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
          {/* Avatar Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setIsModalOpen(true);
              }}
              className="relative group cursor-pointer shrink-0"
              title="Klik untuk memilih avatar pendamping lainnya"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-0.5 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl">
                  {companion.avatarIcon}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 bg-amber-600 text-white p-1 rounded-full text-[9px] shadow-xs group-hover:bg-amber-700">
                <RefreshCw className="w-2.5 h-2.5" />
              </span>
            </button>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                  Avatar Pendamping
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">• {companion.role}</span>
              </div>
              <h4 className="font-heading font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                {companion.name}
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsModalOpen(true);
                  }}
                  className="text-[11px] text-amber-700 hover:text-amber-900 font-semibold underline ml-1 cursor-pointer"
                >
                  (Ganti)
                </button>
              </h4>
              <p className="text-[11px] text-slate-600 italic">"{companion.tagline}"</p>
            </div>
          </div>

          {/* Speech bubble */}
          <div className="w-full sm:max-w-md bg-white border border-amber-200 rounded-xl p-2.5 sm:p-3 shadow-2xs relative">
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">
                  Petunjuk {companion.name}:
                </div>
                <p className="text-xs text-slate-700 leading-snug font-medium mt-0.5">
                  {currentTip}
                </p>
              </div>
              <button
                onClick={handleNextTip}
                className="text-[10px] bg-amber-100 hover:bg-amber-200 text-amber-900 px-2 py-1 rounded-md font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-0.5"
                title="Petunjuk berikutnya"
              >
                <span>Tips Lain</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AvatarSelectionModal
          currentAvatarId={companion.id}
          onSelect={handleChoose}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

interface ModalProps {
  currentAvatarId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const AvatarSelectionModal: React.FC<ModalProps> = ({ currentAvatarId, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 space-y-4 shadow-2xl border border-amber-300">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
              Pilih Avatar Pendamping Belajar
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Pilih karakter pendamping yang akan menemanimu menyelesaikan tantangan fisika, memberikan tips kontekstual, dan menyemangati petualangan energimu!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {COMPANION_AVATARS.map((avatar) => {
            const isSelected = avatar.id === currentAvatarId;
            return (
              <div
                key={avatar.id}
                onClick={() => onSelect(avatar.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all relative ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400 shadow-sm'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-amber-300'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 bg-amber-600 text-white rounded-full p-1 shadow-xs">
                    <Check className="w-3 h-3" />
                  </span>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
                    {avatar.avatarIcon}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900">
                      {avatar.name}
                    </h4>
                    <span className="text-[10px] text-amber-700 font-semibold block">
                      {avatar.role}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 italic">
                  "{avatar.tagline}"
                </p>
                <div className="mt-2 text-[10px] bg-white border border-slate-200 px-2 py-1 rounded text-slate-700">
                  <strong className="text-amber-800">Ciri:</strong> {avatar.title}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
