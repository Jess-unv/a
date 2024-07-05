import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const ChartOtherData1 = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/other-chart-data-1');
        const data = result.data;
        setChartData({
          labels: data.map(item => item.category),
          datasets: [
            {
              label: 'Categorías',
              data: data.map(item => item.value),
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
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
      <Pie
        data={chartData}
        options={{
          responsive: true,
          title: { text: 'Distribución por Categorías', display: true },
        }}
      />
    </div>
  );
};

export default ChartOtherData1;
