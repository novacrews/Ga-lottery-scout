import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';

interface Ticket {
  id: number;
  name: string;
  price: number;
  topPrize: number;
  totalPrizes: number;
  claimedCount: number;
  claimedPercentage: number;
  hotness: string;
  rank: number;
}

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/tickets');
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      setError('Failed to load tickets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>GA Lottery Scout - Find Hot Tickets</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.container}>
        <section className={styles.hero}>
          <h1>🎟️ GA Lottery Scout</h1>
          <p className={styles.tagline}>Find the hottest lottery tickets in Georgia</p>
        </section>

        <section className={styles.ticketsSection}>
          <h2>🔥 Today's Hottest Tickets</h2>

          {loading && <p className={styles.loading}>Loading tickets...</p>}
          {error && <p className={styles.error}>{error}</p>}

          {!loading && tickets.length > 0 && (
            <div className={styles.ticketsTable}>
              {tickets.map((ticket) => (
                <div key={ticket.id} className={styles.tableRow}>
                  <div>#{ticket.rank}</div>
                  <div>{ticket.name}</div>
                  <div>${ticket.price}</div>
                  <div>${ticket.topPrize.toLocaleString()}</div>
                  <div className={styles.badge}>{ticket.hotness}</div>
                  <div>{ticket.claimedPercentage}%</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={styles.premiumSection}>
          <h2>🚀 Go Premium - $4.99/month</h2>
          <p>Get real-time alerts when hot tickets are available</p>
          <button className={styles.premiumButton}>Subscribe Now</button>
        </section>
      </main>
    </>
  );
}
