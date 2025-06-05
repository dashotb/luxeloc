'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/app/firebaseConfig';
import type { Car } from '@/generated/prisma';
import { ArrowLeft } from 'lucide-react';

interface CarFormData {
    name: string;
    brand: string;
    hp: number;
    seats: number;
    category: string;
    daily_price: number;
    weekend_price: number;
    week_price: number;
    description: string;
    caution: number;
    images: string[];
}

export default function EditCarPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [formData, setFormData] = useState<CarFormData>({
        name: '',
        brand: '',
        hp: 0,
        seats: 0,
        category: '',
        daily_price: 0,
        weekend_price: 0,
        week_price: 0,
        description: '',
        caution: 0,
        images: []
    });
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    useEffect(() => {
        fetchCar();
    }, []);

    const fetchCar = async () => {
        try {
            const response = await fetch(`/api/cars/${params.id}`);
            const data = await response.json();
            setFormData(data);
            setPreviewUrls(data.images || []);
        } catch (error) {
            console.error('Erreur lors de la récupération du véhicule:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(e.target.files);
            // Créer les URLs de prévisualisation
            const urls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => [...prev, ...urls]);
        }
    };

    const uploadImages = async (files: FileList): Promise<string[]> => {
        const uploadPromises = Array.from(files).map(async (file) => {
            const storageRef = ref(storage, `cars/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        });

        return Promise.all(uploadPromises);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setUploadingImages(true);

        try {
            let imageUrls = [...formData.images];

            // Upload des nouvelles images si des fichiers sont sélectionnés
            if (selectedFiles && selectedFiles.length > 0) {
                const newImageUrls = await uploadImages(selectedFiles);
                imageUrls = [...imageUrls, ...newImageUrls];
            }

            const response = await fetch(`/api/cars/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    images: imageUrls
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la sauvegarde du véhicule');
            }

            router.push(`/dashboard/vehicules/${params.id}`);
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de la sauvegarde du véhicule');
        } finally {
            setLoading(false);
            setUploadingImages(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'hp' || name === 'seats' || name === 'daily_price' || 
                    name === 'weekend_price' || name === 'week_price' || name === 'caution' 
                    ? Number(value) 
                    : value
        }));
    };

    const removeImage = (index: number) => {
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
                <button
                    onClick={() => router.push(`/dashboard/vehicules/${params.id}`)}
                    className="flex items-center text-gray-600 hover:text-black"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Retour
                </button>
            </div>

            <h1 className="text-2xl font-bold mb-6">Modifier le véhicule</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Marque</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Puissance (ch)</label>
                        <input
                            type="number"
                            name="hp"
                            value={formData.hp}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Places</label>
                        <input
                            type="number"
                            name="seats"
                            value={formData.seats}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                            required
                        >
                            <option value="">Sélectionner une catégorie</option>
                            <option value="CITADINE">Citadine</option>
                            <option value="BERLINE">Berline</option>
                            <option value="SUV">SUV</option>
                            <option value="SPORTIVE">Sportive</option>
                            <option value="LUXE">Luxe</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prix journalier (€)</label>
                        <input
                            type="number"
                            name="daily_price"
                            value={formData.daily_price}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prix weekend (€)</label>
                        <input
                            type="number"
                            name="weekend_price"
                            value={formData.weekend_price}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prix semaine (€)</label>
                        <input
                            type="number"
                            name="week_price"
                            value={formData.week_price}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Caution (€)</label>
                        <input
                            type="number"
                            name="caution"
                            value={formData.caution}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Photos</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="mt-1 block w-full"
                    />
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {previewUrls.map((url, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.push(`/dashboard/vehicules/${params.id}`)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={loading || uploadingImages}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading || uploadingImages ? 'Chargement...' : 'Enregistrer'}
                    </button>
                </div>
            </form>
        </div>
    );
} 