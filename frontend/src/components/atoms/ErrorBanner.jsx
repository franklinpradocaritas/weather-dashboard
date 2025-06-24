import { useError } from '../../context/ErrorContext';

// export default function ErrorBanner() {
//     const { error, clearError } = useError();
//     if (!error) return null;

//     return (
//         <div
//             className='alert alert-warning alert-dismissible fade show'
//             role='alert'
//         >
//             {error}
//             <button
//                 type='button'
//                 className='btn-close'
//                 aria-label='Close'
//                 onClick={clearError}
//             />
//         </div>
//     );
// }

export default function ErrorBanner() {
    const { errors, clearErrors } = useError();

    if (!errors.length) return null;

    console.log('ERROR BANNER:', { errors });

    return (
        <div className='fixed-top p-3'>
            {Array.isArray(errors) &&
                errors.map(({ category, message }) => (
                    <div
                        key={category}
                        className='alert alert-warning alert-dismissible fade show'
                        role='alert'
                    >
                        <strong>[{category}]</strong> {message}
                        <button
                            type='button'
                            className='btn-close'
                            onClick={clearErrors}
                        />
                    </div>
                ))}
        </div>
    );

    // return (
    //     <div
    //         className='alert alert-warning alert-dismissible fade show'
    //         role='alert'
    //     >
    //         {error}
    //         <button
    //             type='button'
    //             className='btn-close'
    //             aria-label='Close'
    //             onClick={clearErrors}
    //         />
    //     </div>
    // );
}
