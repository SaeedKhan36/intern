import { useRef } from "react";
import { Upload, X, ImagePlus } from "lucide-react";

export default function ImageUploader({ images, setImages, error }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = images.length + files.length;

        if (totalImages > 3) {
            return;
        }

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
        }));

        setImages((prev) => [...prev, ...newImages]);
        e.target.value = "";
    };

    const removeImage = (index) => {
        setImages((prev) => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            return updated;
        });
    };

    return (
        <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">
                Site Photos
                <span className="text-surface-400 font-normal ml-1">(max 3)</span>
            </label>

            {/* Upload Area */}
            {images.length < 3 && (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-surface-300 bg-surface-50 rounded-xl p-8 text-center
            cursor-pointer hover:border-surface-400 hover:bg-surface-100
            transition-all duration-200 group"
                >
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-surface-200 flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-md">
                            <Upload size={22} className="text-surface-500 group-hover:text-surface-700 transition-colors" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-surface-700 group-hover:text-surface-900 transition-colors">
                                Click to upload photos
                            </p>
                            <p className="text-xs text-surface-500 mt-1">
                                PNG, JPG or WEBP • drag and drop supported
                            </p>
                            <p className="text-[11px] font-medium text-primary-600 mt-2 bg-primary-50 px-2 py-0.5 rounded-full inline-block">
                                {3 - images.length} remaining
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="photo-upload"
            />

            {/* Image Previews */}
            {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="relative group/img rounded-lg overflow-hidden aspect-square border border-surface-200"
                        >
                            <img
                                src={img.preview}
                                alt={img.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-all duration-200" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 hover:bg-red-500 hover:text-white
                  text-surface-600 flex items-center justify-center shadow-sm
                  opacity-0 group-hover/img:opacity-100 transition-all duration-200"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p className="text-red-500 text-xs mt-1.5">{error}</p>
            )}
        </div>
    );
}
