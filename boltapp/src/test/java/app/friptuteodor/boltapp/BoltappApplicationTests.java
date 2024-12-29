package app.friptuteodor.boltapp;

import com.zaxxer.hikari.HikariDataSource;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Connection;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class BoltappApplicationTests {

    @Autowired
    private HikariDataSource dataSource;

	@Test
	public void testConnection() throws SQLException {
		try (Connection connection = dataSource.getConnection()) {
			assertNotNull(connection);
			System.out.println("Conexiune reușită!");
		}
	}

}
