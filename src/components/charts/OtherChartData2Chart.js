import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const ChartOtherData2 = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/other-chart-data-2');
        const data = result.data;
        setChartData({
          labels: data.map(item => item.label),
          datasets: [
            {
              label: 'Ventas',
              data: data.map(item => item.count),
              backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'],
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
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          title: { text: 'Distribución de Ventas', display: true },
        }}
      />
    </div>
  );
};

export default ChartOtherData2;
