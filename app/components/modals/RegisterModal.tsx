'use client';

import axios from 'axios';
import {FcGoogle} from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai';
import {useCallback,useState} from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Success!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
               toast.error("Đã có lỗi xảy ra!");
            })
            .finally(()=> {
                setIsLoading(false);
            })
    }
    const toggle = useCallback(()=>{
      registerModal.onClose();
      loginModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className=" flex flex-col">
            <Heading
                title="Chào mừng đến với EtoHome"
                subtitle="Tạo tài khoản"
            />
            <Input
              id="email"
              label="Email"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />

              <Input
              id="name"
              label="Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />

              <Input
              id="password"
              type="password"
              label="Password"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
        </div>
    )

    const footerContent = (
        <div className=" flex flex-col gap-4 s ">
          <hr/>
          <Button
            outline
            label="Đăng ký với Google"
            icon={FcGoogle}
            onClick={() => signIn('google')}
          />

          <Button
            outline
            label="Đăng ký với Github"
            icon={AiFillGithub}
            onClick={() => signIn('github')}
          />
          
          <div
            className='
              text-neutral-500
              text-center
              mt-4
              font-light
            '>
            <div className="justify-center text-center flex flex-row items-center gap-2">
              <div>
                Bạn đã có tài khoản?
              </div>
              <div
                onClick={toggle} 
                className="text-neutral-800 cursor-pointer hover:underline">
                Đăng nhập!
              </div>
            </div>
          </div>
        </div>
    )

    return (
        <Modal
           disabled={isLoading}
           isOpen={registerModal.isOpen}
           title="Đăng ký"
           actionLabel="Continue"
           onClose={registerModal.onClose}
           onSubmit={handleSubmit(onSubmit)}
           body={bodyContent}
           footer={footerContent}
        />
    );
}

export default RegisterModal;