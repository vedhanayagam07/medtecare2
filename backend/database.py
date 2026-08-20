import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "medtecare.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    c = conn.cursor()
    
    # Create Alerts table
    c.execute("""
        CREATE TABLE IF NOT EXISTS alerts (
            id TEXT PRIMARY KEY,
            equipmentId TEXT,
            equipmentName TEXT,
            riskDriver TEXT,
            severity TEXT,
            timestamp TEXT,
            status TEXT,
            assignedTo TEXT
        )
    """)
    
    # Create Tickets table
    c.execute("""
        CREATE TABLE IF NOT EXISTS tickets (
            id TEXT PRIMARY KEY,
            equipmentId TEXT,
            equipmentName TEXT,
            title TEXT,
            description TEXT,
            priority TEXT,
            status TEXT,
            createdAt TEXT,
            updatedAt TEXT,
            assignedTechnician TEXT
        )
    """)
    
    conn.commit()
    conn.close()

# --- Alerts CRUD ---

def get_alerts():
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM alerts")
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def insert_alert(alert):
    conn = get_db()
    c = conn.cursor()
    c.execute("""
        INSERT OR IGNORE INTO alerts (id, equipmentId, equipmentName, riskDriver, severity, timestamp, status, assignedTo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (alert['id'], alert['equipmentId'], alert['equipmentName'], alert['riskDriver'], 
          alert['severity'], alert['timestamp'], alert['status'], alert.get('assignedTo')))
    conn.commit()
    conn.close()

# --- Tickets CRUD ---

def get_tickets():
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM tickets")
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def insert_ticket(ticket):
    conn = get_db()
    c = conn.cursor()
    c.execute("""
        INSERT OR IGNORE INTO tickets (id, equipmentId, equipmentName, title, description, priority, status, createdAt, updatedAt, assignedTechnician)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (ticket['id'], ticket['equipmentId'], ticket['equipmentName'], ticket['title'], 
          ticket['description'], ticket['priority'], ticket['status'], ticket['createdAt'], 
          ticket['updatedAt'], ticket.get('assignedTechnician')))
    conn.commit()
    conn.close()

def update_ticket_status(ticket_id, status):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT id FROM tickets WHERE id = ?", (ticket_id,))
    if not c.fetchone():
        conn.close()
        return False
        
    updatedAt = datetime.utcnow().isoformat()
    c.execute("""
        UPDATE tickets
        SET status = ?, updatedAt = ?
        WHERE id = ?
    """, (status, updatedAt, ticket_id))
    conn.commit()
    conn.close()
    return True
