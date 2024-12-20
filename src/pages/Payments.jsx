import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Payments = () => {
  const [deliveries, setDeliveries] = useState([]);
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
        const unpaidDelivered = deliveryData.deliveries.filter(
          (delivery) =>
            delivery.paymentStatus === "unpaid" &&
            delivery.deliveryStatus === "delivered"
        );

        setDeliveries(unpaidDelivered);

        const transporterData = {};
        await Promise.all(
          unpaidDelivered.map(async (delivery) => {
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

  const handlePayment = async (deliveryId, delivery, transporter) => {
    const confirmation = window.confirm(
      `Você tem certeza que quer marcar a entrega ${delivery.protocol} como pago?\n\n` +
      `Detalhes da entrega:\n` +
      `- Protocol: ${delivery.protocol}\n` +
      `- Amount to Pay: ${delivery.fee.toFixed(2)} €\n\n` +
      `Detalhes do transportador:\n` +
      `- Name: ${transporter.firstName} ${transporter.lastName}\n` +
      `- IBAN: ${transporter.iban}\n`
    );

    if (!confirmation) return;

    try {
      const response = await fetch(`${API_URL}/delivery/${deliveryId}/pay`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setDeliveries((prevDeliveries) =>
        prevDeliveries.filter((delivery) => delivery.id !== deliveryId)
      );
    } catch (error) {
      console.error("Payment failed:", error);
      alert(`Failed to mark delivery ${deliveryId} as paid.`);
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

  const totalFee = deliveries.reduce((sum, delivery) => sum + delivery.fee, 0);

  return (
    <div className="flex flex-col items-center pt-24">
      <h1 className="text-lg sm:text-2xl text-blue-950 font-bold">
        Entregas por pagar:
      </h1>

      <div>
        {deliveries.length > 0 ? (
          <div className="flex flex-wrap gap-12 items-center py-24 justify-center">
            {deliveries.map((delivery) => {
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
                  <p><strong>Valor a pagar:</strong> {totalFee.toFixed(2)} €</p>
                  <p><strong>Data:</strong> {date}</p>
                  <p><strong>Hora:</strong> {time}</p>
                  <div className="flex justify-center mt-auto">
                    <button
                      className="bg-blue-950 text-white rounded-full transition duration-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2"
                      onClick={() => handlePayment(delivery.id, delivery, transporter)}
                    >
                      Pagar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Nada consta.</p>
        )}
      </div>
    </div>
  );
};

export default Payments;

