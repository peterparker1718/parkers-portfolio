"use client";

import { useState, useCallback, useRef } from "react";
import type { CropThumbnail } from "@/data/inventory";
import { LABEL_NORMALIZATIONS } from "@/data/inventory";

/**
 * DropZoneIngest — Drag-and-drop asset ingestion zone.
 *
 * Accepts: images (png, jpg, webp), PDFs, audio (m4a, wav, mp3)
 * On drop:
 *   1. Classifies file type
 *   2. Assigns purpose tag (inventory | packaging | deck | web)
 *   3. Normalizes filename using label normalization table
 *   4. Queues for AI auto-tagging
 */

export interface IngestedAsset {
  id: string;
  file: File;
  type: "image" | "pdf" | "audio" | "unknown";
  purpose: CropThumbnail["purpose"];
  normalizedName: string;
  tags: string[];
  status: "queued" | "processing" | "tagged" | "error";
  preview?: string;
}

function classifyFileType(
  file: File
): IngestedAsset["type"] {
  if (file.type.startsWith("image/")) return "image";
  if (file.type === "application/pdf") return "pdf";
  if (file.type.startsWith("audio/")) return "audio";
  return "unknown";
}

function assignPurpose(
  file: File
): CropThumbnail["purpose"] {
  const name = file.name.toLowerCase();
  if (name.includes("inventory") || name.includes("sample") || name.includes("img_"))
    return "inventory";
  if (name.includes("package") || name.includes("label") || name.includes("pkg"))
    return "packaging";
  if (name.includes("deck") || name.includes("pitch") || name.includes("slide"))
    return "deck";
  return "web";
}

function normalizeName(name: string): string {
  let normalized = name;
  // Sort by length descending so longer keys match before shorter substrings
  const entries = Object.entries(LABEL_NORMALIZATIONS).sort(
    (a, b) => b[0].length - a[0].length
  );
  for (const [raw, corrected] of entries) {
    // Use word-boundary-like check: only replace if the corrected form isn't already there
    if (normalized.includes(raw) && !normalized.includes(corrected)) {
      normalized = normalized.replace(new RegExp(raw, "gi"), corrected);
    }
  }
  return normalized;
}

interface DropZoneIngestProps {
  onAssetsIngested?: (assets: IngestedAsset[]) => void;
}

export default function DropZoneIngest({
  onAssetsIngested,
}: DropZoneIngestProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [assets, setAssets] = useState<IngestedAsset[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const newAssets: IngestedAsset[] = Array.from(files).map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        type: classifyFileType(file),
        purpose: assignPurpose(file),
        normalizedName: normalizeName(file.name),
        tags: [],
        status: "queued" as const,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }));

      setAssets((prev) => [...prev, ...newAssets]);
      onAssetsIngested?.(newAssets);
    },
    [onAssetsIngested]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
      }
    },
    [processFiles]
  );

  return (
    <div className="space-y-4" data-testid="drop-zone">
      {/* Drop target */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-green-500 bg-green-500/10"
            : "border-zinc-700 bg-zinc-900/50 hover:border-zinc-500"
        }`}
        data-testid="drop-target"
        role="button"
        tabIndex={0}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,audio/*"
          onChange={handleFileSelect}
          className="hidden"
          data-testid="file-input"
        />
        <div className="space-y-2">
          <p className="text-zinc-400 text-sm">
            {isDragging
              ? "Drop files to ingest..."
              : "Drag & drop assets here, or click to browse"}
          </p>
          <p className="text-zinc-600 text-xs">
            Accepts: PNG, JPG, WebP, PDF, M4A, WAV, MP3
          </p>
        </div>
      </div>

      {/* Ingested asset list */}
      {assets.length > 0 && (
        <div className="space-y-2" data-testid="asset-list">
          <h3 className="text-xs tracking-[0.2em] uppercase text-zinc-500">
            INGESTED ASSETS — {assets.length}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2"
                data-testid="ingested-asset"
              >
                {/* Preview thumbnail */}
                {asset.preview && (
                  <div className="aspect-square rounded-lg overflow-hidden bg-zinc-800">
                    <img
                      src={asset.preview}
                      alt={asset.normalizedName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!asset.preview && (
                  <div className="aspect-square rounded-lg bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-600 text-xs uppercase">
                      {asset.type}
                    </span>
                  </div>
                )}

                {/* Metadata */}
                <div>
                  <p className="text-[10px] font-mono truncate text-zinc-300">
                    {asset.normalizedName}
                  </p>
                  <div className="flex gap-1 mt-1">
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase">
                      {asset.type}
                    </span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase">
                      {asset.purpose}
                    </span>
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded uppercase ${
                        asset.status === "tagged"
                          ? "bg-green-900/30 text-green-400"
                          : asset.status === "error"
                          ? "bg-red-900/30 text-red-400"
                          : "bg-yellow-900/30 text-yellow-400"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </div>
                  {/* Tags */}
                  {asset.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {asset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] px-1 py-0.5 rounded-full border border-zinc-700 text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Export helpers for testing
export { classifyFileType, assignPurpose, normalizeName };
