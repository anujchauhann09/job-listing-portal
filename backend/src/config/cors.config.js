const allowedOrigins = [
  'http://localhost:3000',     
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },

  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Request-Id'
  ],

  exposedHeaders: ['X-Request-Id'],
  credentials: true, 
  maxAge: 600        
};

module.exports = corsOptions;
