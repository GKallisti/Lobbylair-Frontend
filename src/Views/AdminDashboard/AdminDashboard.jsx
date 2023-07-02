import React, { useEffect } from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFavorites, getAllGames } from '../../Redux/actions';
Chart.register(...registerables);

const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Cantidad de Usuarios',
      data: [65, 59, 80, 81, 56, 55, 60],
      borderColor: '#FF6384',
      fill: false,
    },
  ],
};

const barChartData = {
  labels: ['Valorant', 'Minecraft', 'Diablo4', 'Gta 5 Online', 'League of Legends', 'Apex Legends'],
  datasets: [
    {
      label: 'Número de favoritos',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#FF6384',
    },
  ],
};

const options = {
  responsive: true,
};

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFavorites());
    dispatch(getAllGames());
  }, []);

  const games = useSelector(state => state.games);
  const counts = useSelector(state => state.favoritesCount);

  const newObject = counts.map(count => {
    const game = games.find(game => +game.id === +count.gameId);
    const name = game ? game.name : null;
    return {
      ...count,
      name: name
    };
  });

  // Obtener los nombres de los juegos y los recuentos de newObject
  const labels = newObject.map(item => item.name);
  const data = newObject.map(item => item.count);

  // Actualizar los valores de labels y data en barChartData
  const updatedBarChartData = {
    ...barChartData,
    labels: labels,
    datasets: [
      {
        ...barChartData.datasets[0],
        data: data
      }
    ]
  };

  //datos usuario
  const users = useSelector(state => state.otherUser);
  const premiumUsers = users.filter(user => user.isPremium === true);
  const numberPremiumUsers = premiumUsers.length;
  const totalUsers = users.length;
  const notPremiumUsers = totalUsers - premiumUsers.length;

  const pieChartUserData = {
    labels: ['Users', 'Premium Users', 'Number of Premium Users', 'Total Users', 'Not Premium Users'],
    datasets: [
      {
        label: 'Dataset',
        data: [users.length, premiumUsers.length, numberPremiumUsers, totalUsers, notPremiumUsers],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33FF77', '#8A2BE2'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33FF77', '#8A2BE2'],
      },
    ],
  };

  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="w-full md:w-1/3 mt-5">
        <h1 className="text-center my-4">Estadisticas Generales Usuarios</h1>
        <Pie data={pieChartUserData} options={options} />
      </div>
      <div className="w-full md:w-2/3 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h1 className="text-center my-4">Usuarios ingresados el último semestre</h1>
          <Line data={lineChartData} options={options} />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-center my-4">Estadísticas de Juegos Favoritos</h1>
          <Bar data={updatedBarChartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;