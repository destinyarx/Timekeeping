-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2021 at 11:20 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbfaceapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `emp_id` varchar(250) NOT NULL,
  `time_in` varchar(250) NOT NULL,
  `time_out` varchar(250) NOT NULL,
  `logdate` varchar(250) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `emp_id`, `time_in`, `time_out`, `logdate`, `type`, `status`) VALUES
(9, 'SY03-1144', '14:36:06 PM', '14:36:22 PM', '2021-09-19', 1, 0),
(10, 'SY01-1122', '14:38:34 PM', '14:39:29 PM', '2021-09-20', 1, 0),
(11, 'SY03-1144', '14:39:20 PM', '20:26:13 PM', '2021-09-20', 1, 0),
(12, 'SY01-1122', '14:39:38 PM', '', '2021-09-19', 0, 0),
(13, 'SY03-1144', '14:46:10 PM', '20:26:13 PM', '2021-09-20', 1, 0),
(14, 'SY03-1144', '17:08:07 PM', '20:26:13 PM', '2021-09-20', 1, 0),
(17, 'SY03-1144', '10:08:21 AM', '10:08:27 AM', '2021-09-22', 1, 0),
(18, 'SY03-1144', '10:08:33 AM', '', '2021-09-22', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `emp_id` varchar(250) NOT NULL,
  `fname` varchar(250) NOT NULL,
  `mid_init` varchar(250) NOT NULL,
  `lname` varchar(250) NOT NULL,
  `img` varchar(250) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `emp_id`, `fname`, `mid_init`, `lname`, `img`, `date_created`, `date_modified`, `status`) VALUES
(1, 'SY01-1122', 'John', 'P', 'Cena', '', '2021-09-18 16:00:00', '2021-09-19 00:00:00', 0),
(2, 'SY02-1133', 'Andres', 'P', 'Jario', '', '2021-09-18 16:00:00', '2021-09-19 00:00:00', 0),
(3, 'SY03-1144', 'Crischel', 'T', 'Amorio', '', '2021-09-18 16:00:00', '2021-09-19 00:00:00', 0),
(4, '111', 'Krys', 'P.', 'Tablanza', '', '2021-09-27 02:23:58', '0000-00-00 00:00:00', 0),
(5, '222', 'Jericka', 'A.', 'Chua', '', '2021-09-27 02:25:45', '0000-00-00 00:00:00', 0),
(6, '333', 'Jeremy', 'P.', 'Ditablan', '', '2021-09-27 02:46:36', '0000-00-00 00:00:00', 0),
(7, '111', 'Krys', 'P.', 'Tablanza', '', '2021-09-27 06:13:32', '0000-00-00 00:00:00', 0),
(8, '111', 'Krys', 'P.', 'Tablanza', '', '2021-09-27 06:14:05', '0000-00-00 00:00:00', 0),
(9, '222', 'Jericka', 'A.', 'Chua', '', '2021-09-27 06:14:19', '0000-00-00 00:00:00', 0),
(10, '222', 'Jericka', 'A.', 'Chua', '', '2021-09-27 06:14:38', '0000-00-00 00:00:00', 0),
(11, '333', 'Jeremy', 'P.', 'Ditablan', '', '2021-09-27 06:14:54', '0000-00-00 00:00:00', 0),
(12, '333', 'Jeremy', 'P.', 'Ditablan', '', '2021-09-27 06:14:59', '0000-00-00 00:00:00', 0),
(13, '111', 'Krys', 'P.', 'Tablanza', '', '2021-09-27 06:20:56', '0000-00-00 00:00:00', 0),
(14, 'Bruh', 'Bruh', 'Bruh', 'Bruh', '', '2021-09-27 06:23:26', '0000-00-00 00:00:00', 0),
(15, '111', 'Krys', 'P.', 'Tablanza', '', '2021-09-27 06:26:03', '0000-00-00 00:00:00', 0),
(16, '111', 'Krys', 'P.', 'Tablanza', '', '2021-09-27 06:29:01', '0000-00-00 00:00:00', 0),
(17, '111', 'Krys', 'P.', 'Tablanza', '', '2021-09-27 06:30:49', '0000-00-00 00:00:00', 0),
(18, '11', 'k', 'p', 't', '', '2021-09-27 06:31:01', '0000-00-00 00:00:00', 0),
(19, ' 111', 'k', 'p', 't', '', '2021-09-27 06:31:42', '0000-00-00 00:00:00', 0),
(20, '33', 'qq', 'qq', 'qq', '', '2021-09-27 06:31:52', '0000-00-00 00:00:00', 0),
(21, '33', 'qq', 'qq', 'qq', '', '2021-09-27 06:32:17', '0000-00-00 00:00:00', 0),
(22, 'qwe', 'qwe', 'qwe', 'qwe', '', '2021-09-27 06:32:24', '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `ID` int(11) NOT NULL,
  `TIMEIN` time NOT NULL,
  `TIMEOUT` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
