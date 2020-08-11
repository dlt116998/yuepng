module.exports = {
    devServer:{
        open:true,
        proxy:{
            '/motor': {
                target: 'https://www.dcdapp.com',
                changeOrigin: true, 
            },
            '/member': {
                target: 'https://www.520mg.com',
                changeOrigin: true, 
            },
            '/mi': {
                target: 'https://www.520mg.com',
                changeOrigin: true, 
            }
        }
    }
}