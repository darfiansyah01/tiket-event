import React, { useContext, useState, useEffect } from 'react';
import { auth, db} from './config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, onSnapshot, serverTimestamp, setDoc, collection, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState();
    const [transaksi, setTransaksi] = useState();
    const [userData, setUserData] = useState();

    async function signup(email, password, name, phoneNumber) {

        return createUserWithEmailAndPassword(auth, email, password).then(user =>
        {
           setDoc(doc(db, "user", user.user.uid), {
                id: user.user.uid,
                nama: name,
                email: email,
                no_telp: phoneNumber,
                roles: 1001,
                alamat: [],
                jenis_kelamin: '',
                avatarUrl: '',
                createAd: serverTimestamp()
            })
        })

    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
        
    }

    function logout() {
        return signOut(auth).then(() => setUserData());
    }


    async function tambahEvent(nama_event, harga, kategori, stok_tiket, venue, kota, syarat, tglMulai, tglBerakhir, gambarURL){
        const event = doc(collection(db, "event"));
        await setDoc(event, {
            kode : event.id,
            admin_id: userData.id,
            nama_event: nama_event,
            harga: harga,
            imageUrl: gambarURL,
            stok: stok_tiket,
            syarat: syarat,
            kota: kota,
            venue: venue,
            tglMulai: tglMulai,
            tglBerakhir: tglBerakhir,
            kategori: kategori,
        })
    }

    async function tambahTransaksi(user, event_detail, metode_pembayaran, total_bayar){
        const transaksi = doc(collection(db, "transaksi"));
        await setDoc(transaksi, {
            kode : transaksi.id,
            event: event_detail,
            user: user,
            userId : user.id,
            metode_pembayaran: metode_pembayaran,
            total_bayar: total_bayar,
            createAd: serverTimestamp(),
        }).then(async () => {
                 const docRef = doc(db, "transaksi", transaksi.id);
                const docSnap = await getDoc(docRef);     
                if (docSnap.exists()) {
                    setTransaksi(docSnap.data());
                  } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                  }
           
        })
    }

    async function updateStatusPembayaran(id){
        await updateDoc(doc(db, "transaksi", id), {
            status_pembayaran: "berhasil",
        })
    }

    async function deleteTransaksi(data){
        await deleteDoc(doc(db, "transaksi", data.kode))
    }

    function UploadBuktiPembayaran(url, id) {
        
        if(url){
            updateDoc(doc(db, "transaksi", id), {
                bukti_pembayaran: url,
                status_pembayaran: "validasi",
            })
        } else {
            updateDoc(doc(db, "transaksi", id), {
                status_pembayaran: "gagal"
            })
        }
        
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            onSnapshot(doc(db, "user", user.uid), (doc) => {
                setUserData(doc.data())
            })
            setLoading(false)
        })
        return unsubscribe

    }, [])

    const value = {
        currentUser,
        userData,
        transaksi,
        signup,
        login,
        logout,
        tambahEvent,
        tambahTransaksi,
        UploadBuktiPembayaran,
        deleteTransaksi,
        updateStatusPembayaran,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}