const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '5034193ef8ba6d87d41e19ce557407c3',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;