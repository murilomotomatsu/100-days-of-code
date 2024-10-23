
export const getMessage = async (message) => {
    try {
        const response = await fetch('https://gpt-services.onrender.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        console.log(response)
        return data.response;
    } catch (error) {
        return 'Error, try again later.';
    }
}