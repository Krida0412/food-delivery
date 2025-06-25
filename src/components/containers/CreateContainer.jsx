import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from 'react-icons/md';
import { categories } from '../../utils/data';
import Loader from '../ui/Loader';
import axios from 'axios';

import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { getAllFoodItems, saveItem } from '../../utils/firebaseFunctions';

const CreateContainer = () => {
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertstatus, setAlertStatus] = useState('danger');
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const uploadImage = async (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'food_upload');
    formData.append('cloud_name', 'dafsa8rry');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dafsa8rry/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const data = res.data;
      setImageAsset(data.secure_url);
      setIsLoading(false);
      setFields(true);
      setMsg('Gambar berhasil diunggah 🎉');
      setAlertStatus('success');

      setTimeout(() => {
        setFields(false);
      }, 4000);
    } catch (error) {
      console.error(error);
      setFields(true);
      setMsg('Terjadi kesalahan saat mengunggah: ' + error.message);
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const deleteImage = () => {
    setImageAsset(null);
    setFields(true);
    setMsg('Gambar berhasil dihapus 🎉');
    setAlertStatus('success');
    setTimeout(() => {
      setFields(false);
    }, 4000);
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !price || !category || !imageAsset) {
        setFields(true);
        setMsg('Mohon lengkapi semua kolom 🙇‍♂️');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title,
          calories,
          price,
          category,
          imageURL: imageAsset,
          qty: 1,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg('Data berhasil disimpan 🎉');
        clearData();
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg('Terjadi kesalahan saat menyimpan: Coba lagi 🙇‍♂️');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setTitle('');
    setImageAsset(null);
    setCalories('');
    setPrice('');
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertstatus === 'danger'
                ? ' bg-red-400 text-red-800'
                : ' bg-emerald-400 text-emerald-800'
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nama Makanan"
            className="w-full h-full text-lg bg-transparent font-semibold outline-none placeholder-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Pilih Kategori
            </option>
            {categories.map((item) => (
              <option
                key={item.id}
                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                value={item.urlParamName}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-lg group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Unggah Gambar
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="upldimg"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute p-3 bottom-3 right-3 rounded-full bg-red-500 text-xl outline-none hover:shadow-md duration-500 transition-all ease-in-out cursor-pointer"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex-col flex md:flex-row items-center gap-3">
          <div className="w-full flex py-2 border-gray-300 border-b items-center gap-2">
            <MdFoodBank className="text-2xl text-gray-700" />
            <input
              type="text"
              required
              onChange={(e) => setCalories(e.target.value)}
              value={calories}
              placeholder="Jumlah Kalori"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          <div className="w-full flex py-2 border-gray-300 border-b items-center gap-2">
            <MdAttachMoney className="text-2xl text-gray-700" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Harga"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-xl text-white font-semibold"
            onClick={saveDetails}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
