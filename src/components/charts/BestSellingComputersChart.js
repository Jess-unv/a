import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BestSellingComputersChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/best-selling-computers');
        const data = result.data;
        setChartData({
          labels: data.map(item => item.name),
          datasets: [
            {
              label: 'Ventas',
              data: data.map(item => item.sales),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Ocurrió un error: {error.message}</div>;
  if (!chartData) return <div>No hay datos disponibles</div>;

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          title: { text: 'Mejores ventas de computadoras', display: true },
          scales: {
            x: {
              type: 'category'
            },
            y: {
              type: 'linear'
            }
          }
        }}
      />
    </div>
  );
};

export default BestSellingComputersChart;
