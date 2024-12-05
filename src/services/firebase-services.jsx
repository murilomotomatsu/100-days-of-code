const API_BASE_URL = 'https://firebase-100daysofcode.onrender.com'

const rankService = {

    async addRank(gameType, nome, score, data) {
        try {
            const response = await fetch(`${API_BASE_URL}/add-rank`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gameType,
                    nome,
                    score,
                    data,
                }),
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar rank:', error);
            throw error;
        }
    },

    async getRank(gameType) {
        try {
            const response = await fetch(`${API_BASE_URL}/get-rank?gameType=${encodeURIComponent(gameType)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao obter rank:', error);
            throw error;
        }
    }
};

export default rankService;