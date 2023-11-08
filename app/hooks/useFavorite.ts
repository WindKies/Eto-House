import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {toast} from "react-hot-toast";

import { SafeUser } from "../types";
import { useState } from "react";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}


const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite ) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [favoriteText, setFavoriteText] = useState('Thêm vào ưa thích');
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favouriteIds || [];

        return list.includes(listingId);

    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if(!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if(hasFavorited){
                setFavoriteText('Thêm ưa thích');
                request = () => axios.delete(`/api/favorites/${listingId}`);
                
            } else {
                setFavoriteText('Hủy ưa thích');
                request = () => axios.post(`/api/favorites/${listingId}`);
                
            }
            await request();
            router.refresh();
            toast.success(favoriteText);
        } catch (error) {
            toast.error('Đã có lỗi xảy ra.');
        }
    },
    [
        currentUser,
        hasFavorited,
        listingId,
        loginModal,
        favoriteText,
        router
    ]);

    return{
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;