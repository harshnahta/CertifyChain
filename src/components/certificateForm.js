import React, { memo, useState } from 'react';
import { useRouter } from 'next/router';
// using axios directly since everythign is simple and we are not having any authorization/common method to add
import axios from 'axios';
import moment from 'moment';
const errorClass = 'border-red-500';

const ERROR_DEFAULT_OBJECT = {
  receiptientName: false,
  courseName: false,
  issuerName: false,
  dateOfIssue: false,
};

const CertificateForm = () => {
  const router = useRouter();
  // state of data holding
  const [state, setState] = useState({
    receiptientName: '',
    courseName: '',
    issuerName: '',
    dateOfIssue: '',
  });

  //   error object used to define/show errors on form
  const [error, setError] = useState({
    ...ERROR_DEFAULT_OBJECT,
  });

  //   method to add/update value on input fields
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState((preState) => ({
      ...preState,
      [name]: value,
    }));

    setError((preState) => ({
      ...preState,
      [name]: !value,
    }));
  };

  //  use to validate form
  const isValidateForm = () => {
    let returnVal = true;
    const errorObj = { ...ERROR_DEFAULT_OBJECT };
    if (!state.receiptientName) {
      errorObj.receiptientName = true;
      returnVal = false;
    }

    if (!state.courseName) {
      errorObj.courseName = true;
      returnVal = false;
    }

    if (!state.issuerName) {
      errorObj.issuerName = true;
      returnVal = false;
    }

    if (!state.dateOfIssue || !moment(state.dateOfIssue).isValid()) {
      errorObj.dateOfIssue = true;
      returnVal = false;
    }

    setError(errorObj);
    return returnVal;
  };

  //   submit form to create certificate
  const submitForm = async () => {
    try {
      if (isValidateForm()) {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/create`,
          {
            ...state,
          }
        );
        if (result.status === 201) {
          const id = result.data.id;
          router.push(`/certificate/${id}`);
        }
      }
    } catch (e) {
      // Some error comes
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="receiptientName"
          >
            {`Recipient's Name`}
          </label>
          <input
            className={`shadow appearance-none border ${
              error.receiptientName && errorClass
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="receiptientName"
            name="receiptientName"
            type="text"
            placeholder="Recipient's Name"
            onChange={handleOnChange}
          />
          {error.receiptientName && (
            <p className="text-red-500 text-xs italic">{`Recipient's Name is required.`}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="courseName"
          >
            Course Name
          </label>
          <input
            className={`shadow appearance-none border ${
              error.courseName && errorClass
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="courseName"
            name="courseName"
            type="text"
            placeholder="Course Name"
            onChange={handleOnChange}
          />
          {error.courseName && (
            <p className="text-red-500 text-xs italic">{`Course Name is required.`}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="issuerName"
          >
            {`Issuer's Name`}
          </label>
          <input
            className={`shadow appearance-none border ${
              error.issuerName && errorClass
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="issuerName"
            name="issuerName"
            type="text"
            placeholder="Issuer's Name"
            onChange={handleOnChange}
          />
          {error.issuerName && (
            <p className="text-red-500 text-xs italic">{`Issuer's Name is required.`}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dateOfIssue"
          >
            Date of Issue
          </label>
          <input
            className={`shadow appearance-none border ${
              error.dateOfIssue && errorClass
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="dateOfIssue"
            name="dateOfIssue"
            type="date"
            placeholder="Date of Issue"
            onChange={handleOnChange}
          />
          {error.dateOfIssue && (
            <p className="text-red-500 text-xs italic">{`Date of Issue is not valid.`}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={submitForm}
          >
            Create Certificate
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(CertificateForm);
