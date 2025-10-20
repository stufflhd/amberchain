export const submitCompareOptions = async (formData) => {
    
    const res = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/api/compare-options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    let response;
    try {
        response = await res.json();
    } catch (err) {
        response = { message: err }
    }
    if (!res.ok) {
        throw new Error(response.message)
    };

    return response;
};