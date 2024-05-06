'use client';
import { Button } from '@/components/Button';
import SelectField from '@/components/forms/SelectField';
import React, { useContext } from 'react';
import { FileContext } from '../../context/file.context';

const LanguageSelector = () => {
  const { dispatch } = useContext(FileContext);
  return (
    <form className="bg-white p-6 shadow-xl w-full h-fit rounded-lg">
      <SelectField type="language" name="language" props={''} />
      <div className="mt-4">
        <Button
          onClick={() => dispatch({ type: 'SELECT_LANGUAGE', payload: false })}
        >
          Select
        </Button>
      </div>
    </form>
  );
};

export default LanguageSelector;
