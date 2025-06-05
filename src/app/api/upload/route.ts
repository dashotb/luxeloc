import { NextResponse } from "next/server";
import { storage } from "@/app/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;

    if (!file) {
      return new NextResponse("Aucun fichier fourni", { status: 400 });
    }

    if (!type) {
      return new NextResponse("Type de document non spécifié", { status: 400 });
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/") && !file.type.startsWith("application/pdf")) {
      return new NextResponse("Type de fichier non autorisé", { status: 400 });
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return new NextResponse("Fichier trop volumineux (max 5MB)", { status: 400 });
    }

    // Convertir le fichier en buffer
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // Générer un nom de fichier unique
    const fileExtension = file.name.split(".").pop();
    const fileName = `${type}/${uuidv4()}.${fileExtension}`;

    // Créer une référence dans Firebase Storage
    const storageRef = ref(storage, fileName);

    // Uploader le fichier
    await uploadBytes(storageRef, bytes);

    // Récupérer l'URL de téléchargement
    const downloadURL = await getDownloadURL(storageRef);

    return NextResponse.json({ url: downloadURL });
  } catch (error) {
    console.error("Erreur lors de l'upload du document:", error);
    return new NextResponse("Erreur lors de l'upload du document", { status: 500 });
  }
} 