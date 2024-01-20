import React from 'react';
import moment from 'moment';
import axios from 'axios';

function Index(props) {
  const { id, data, error } = props;
  let Block = '';
  if (error) {
    Block = (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md ">
        <h1 className="text-red-600 text-center text-3xl font-bold mb-4">
          Invalid certificate id!
        </h1>
      </div>
    );
  } else {
    const certificateInfo = JSON.parse(data);
    Block = (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md ">
        <h1 className="text-green-600 text-center text-3xl font-bold mb-4">
          {id}
        </h1>

        <div className="mb-6 text-green-400 text-xl font-bold mb-4">
          <p>
            This is to certify that{' '}
            <span className="text-2xl font-bold mt-2">
              {certificateInfo.receiptientName}
            </span>
          </p>

          <p>
            has successfully completed the course in:{' '}
            <span className="text-xl font-bold mt-2">
              {certificateInfo.courseName}
            </span>
          </p>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>
            Date of Issue:{' '}
            {moment(certificateInfo.dateOfIssue).format('DD-MMM-YYYY')}
          </p>
          <p>
            {`Issuer's Name:`} {certificateInfo.issuerName}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">{Block}</div>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const id = query.slug;
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/get-certificate/${id}`
    );
    if (result?.data?.data) {
      return {
        props: {
          id,
          data: JSON.stringify(result.data.data),
        },
      };
    } else {
      return {
        props: {
          id,
          error: 'Not found',
        },
      };
    }
  } catch (error) {
    return {
      props: {
        id,
        error: error?.message,
      },
    };
  }
}

export default Index;
