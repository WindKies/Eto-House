'use client';
import {toast} from "react-hot-toast";
import { SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import ImageUpload from "../components/inputs/ImageUpload";
import { FaIdCard, FaEnvelope } from 'react-icons/fa';

interface ProfilesClientProps {
  currentUser?: SafeUser | null,
}


const ProfilesClient: React.FC<ProfilesClientProps> = ({
  currentUser
}) => {
  const [newName, setNewName] = useState(currentUser?.name || '');
  const [newEmail, setNewEmail] = useState(currentUser?.email || '');
  const [newImage, setNewImage] = useState(currentUser?.image || '');
  const [newPassword, setNewPassword] = useState(currentUser?.hashedPassword || '');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleImageChange = (imageUrl: string) => {
    setNewImage(imageUrl);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

const handleSave = async () => {
  if (newPassword !== confirmPassword) {
    toast.error('Mật khẩu và xác nhận mật khẩu không khớp');
    return;
  }
  const data = {
    name: newName,
    email: newEmail,
    image: newImage,
    password: newPassword
  }
  axios.post('/api/users', data)
  .then(() => {
      toast.success('Thay đổi thông tin thành công!');
      location.reload();
  })
  .catch((error) => {
     toast.error("Đã có lỗi xảy ra!");
  })
  .finally(()=> {
      
  })
};

return (
  <Container>
    <Heading
      title="Hồ sơ người dùng"
      subtitle="Tài khoản của bạn"
    />
    <div className="flex w-full">

      {/* Profile */}
      <div className="mx-auto w-[400px] h-[400px] shadow-lg rounded-xl bg-white flex flex-col gap-2 items-center justify-center">
        <div className="flex gap-2 items-center text-xl font-semibold">
          {currentUser?.name}
       </div>
        <div className="w-35 h-35 object-cover overflow-hidden border border-radius">
        <ImageUpload onChange={handleImageChange} value={newImage} />
        </div>
       
        
    <div className="mt-2 flex flex-col gap-2 items-start">
      <div className="flex gap-2 items-center text-xs font-semibold">
        <FaIdCard size={18} />
        <div>
          {currentUser?.id}
        </div>
      </div>

      <div className="flex gap-2 items-center text-xs font-semibold">
        <FaEnvelope size={18} />
        <div>
          {currentUser?.email}
        </div>
    </div>
        </div>

      </div >

      {/* Update */}
      <div className="mx-auto ml-8 w-2/4 h-[400px] shadow-lg rounded-xl bg-white p-8">
        <Heading
          title="Chỉnh sửa thông tin cá nhân"
        />
        <div>
          <div className="mt-4 text-sm font-semibold">
            Tên pháp lý: {currentUser?.name}
          </div>
          <input
            className="mt-1 text-sm px-2 py-1 border rounded-sm w-full"
            type="text"
            onChange={handleNameChange}
            placeholder="Nhập tên mới"
          />
        </div>

        <div className="mt-4">
          <div className="text-sm font-semibold">
            Gmail: {currentUser?.email}
          </div>
          <input
            className="mt-1 text-sm px-2 py-1 border rounded-sm w-full"
            type="text"
            onChange={handleEmailChange}
            placeholder="Nhập email mới"
          />
        </div>

        <div className="mt-4">
          <div className="text-sm font-semibold">
            Đổi mật khẩu:
          </div>
          <input
            className="mt-1 text-sm px-2 py-1 border rounded-sm w-full"
            type="password"
            onChange={handlePasswordChange}
            placeholder="Nhập mật khẩu "
          />
          <input
            className="mt-2 text-sm px-2 py-1 border rounded-sm w-full"
            type="password"
            onChange={handleConfirmPasswordChange}
            placeholder="Xác nhận mật khẩu"
          />
        </div>

        <div className="mt-4 text-sm w-1/5 mx-auto"><Button
            label="Xác nhận"
            onClick={handleSave}
          /></div>
      </div>
    </div>
  </Container>
);
}

export default ProfilesClient;