import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const MarkDelivery = () => {
  const [undeliveredDeliveries, setUndeliveredDeliveries] = useState([]);
  const [transporters, setTransporters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const deliveryRes = await fetch(`${API_URL}/delivery`, {
          method: 'GET',
          credentials: 'include',
      });
        if (!deliveryRes.ok) {
          throw new Error(`HTTP error! Status: ${deliveryRes.status}`);
        }
        const deliveryData = await deliveryRes.json();

        const undelivered = deliveryData.deliveries.filter(
          (delivery) => delivery.deliveryStatus === "undelivered"
        );

        setUndeliveredDeliveries(undelivered);

        const transporterData = {};
        await Promise.all(
          undelivered.map(async (delivery) => {
            if (!transporterData[delivery.carId]) {
              const transporterRes = await fetch(
                `${API_URL}/user/transporter/${delivery.carId}`, {
                  method: 'GET',
                  credentials: 'include',
              }
              );
              if (!transporterRes.ok) {
                throw new Error(`HTTP error! Status: ${transporterRes.status}`);
              }
              const transporter = await transporterRes.json();
              transporterData[delivery.carId] = transporter.transporter;
            }
          })
        );
        setTransporters(transporterData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMarkAsDelivered = async (deliveryId, delivery) => {
    const confirmation = window.confirm(
      `Você tem certeza que quer marcar a entrega ${delivery.protocol} como entregue?\n\n` +
      `Detalhes da entrega:\n` +
      `- Protocólo: ${delivery.protocol}\n` +
      `- Valor a pagar: ${delivery.fee.toFixed(2)} €`
    );

    if (!confirmation) return;

    try {
      const response = await fetch(`${API_URL}/delivery/${deliveryId}/deliver`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          deliveryStatus: "delivered",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setUndeliveredDeliveries((prevDeliveries) =>
        prevDeliveries.filter((delivery) => delivery.id !== deliveryId)
      );
    } catch (error) {
      console.error("Failed to mark delivery as delivered:", error);
      alert(`Failed to mark delivery ${delivery.protocol} as delivered.`);
    }
  };

  if (loading) return <div>Loading deliveries...</div>;
  if (error) return <div>Error: {error}</div>;

  const formatScheduledDate = (scheduledAt) => {
    const scheduledDate = new Date(scheduledAt);
    const date = scheduledDate.toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const time = scheduledDate.toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { date, time };
  };

  return (
    <div className="flex flex-col items-center pt-24">
      <h1 className="text-lg sm:text-2xl text-blue-950 font-bold">
        Entregas não realizadas:
      </h1>

      <div>
        {undeliveredDeliveries.length > 0 ? (
          <div className="flex flex-wrap gap-12 items-center py-24 justify-center">
            {undeliveredDeliveries.map((delivery) => {
              const { date, time } = formatScheduledDate(delivery.scheduledAt);
              const transporter = transporters[delivery.carId];

              return (
                <div
                  className="flex flex-col w-80 h-[400px] max-w-xs p-6 bg-slate-100 text-slate-800 border-2 border-slate-200 gap-4 rounded-md shadow-md"
                  key={delivery.id}
                >
                  {transporter && (
                    <>
                      <p><strong>Transportador:</strong> {transporter.firstName} {transporter.lastName}</p>
                      <p><strong>IBAN:</strong> {transporter.iban}</p>
                      <p><strong>NIF:</strong> {transporter.taxDocument}</p>
                    </>
                  )}
                  <p><strong>Protocolo:</strong> {delivery.protocol}</p>
                  <p><strong>Valor:</strong> {delivery.fee.toFixed(2)} €</p>
                  <p><strong>Data:</strong> {date}</p>
                  <p><strong>Hora:</strong> {time}</p>
                  
                  <div className="flex justify-center mt-auto">
                    <button
                      className="bg-blue-950 text-white rounded-full transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2"
                      onClick={() => handleMarkAsDelivered(delivery.id, delivery)}
                    >
                      Entregue
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Nenhuma entrega pendente.</p>
        )}
      </div>
    </div>
  );
};

export default MarkDelivery;








