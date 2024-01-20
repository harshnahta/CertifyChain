import React, { memo, useState } from 'react';
import { useRouter } from 'next/router';

const errorClass = 'border-red-500';

const CertificateForm = () => {
  const router = useRouter();
  // certificate id  data holding
  const [certificateId, setCertificateId] = useState('');
  const [isError, setIsError] = useState(false);

  const handleOnChange = (event) => {
    const { value } = event.target;
    setCertificateId(value);
    setIsError(!value);
  };

  //   submit form to search certificate
  const submitForm = async () => {
    if (certificateId) {
      router.push(`/certificate/${certificateId}`);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="certificateId"
          >
            {`Certificate Id`}
          </label>
          <input
            className={`shadow appearance-none border ${
              isError && errorClass
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="certificateId"
            name="certificateId"
            type="text"
            placeholder="Certificate Id"
            onChange={handleOnChange}
          />
          {isError && (
            <p className="text-red-500 text-xs italic">{`Certificate Id is required.`}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={submitForm}
          >
            Search Certificate
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(CertificateForm);
