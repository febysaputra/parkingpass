-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2017 at 10:54 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `keeppass`
--

-- --------------------------------------------------------

--
-- Table structure for table `manpass`
--

CREATE TABLE `manpass` (
  `id_manpass` int(11) NOT NULL,
  `id_user_fk` int(11) NOT NULL,
  `account` varchar(255) NOT NULL,
  `password_acc` varchar(255) NOT NULL,
  `keterangan` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `manpass`
--

INSERT INTO `manpass` (`id_manpass`, `id_user_fk`, `account`, `password_acc`, `keterangan`) VALUES
(10, 4, 'google', '82KKLVerlkd1v++3ZoxbQA==', 'google'),
(13, 2, 'steam', 'HgPbjVKAEZOTNTr8vh4s+A==', 'steam pass'),
(14, 2, 'paypal', 'CMC7TI+HUIdaYidkKoEeNw==', 'segalanya');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `master_pass` varchar(255) NOT NULL,
  `tokenkey` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `email`, `master_pass`, `tokenkey`) VALUES
(1, 'cacad@tuta.io', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'gArc81odSfO7Uq42GCkpTg=='),
(2, 'baba@tuta.io', 'e75a6cd43a16c2f31d1a3c17700af64d3658a380c49d65b20cc75b1f7c0e001b', 'M23+M40bnfOOTOSM8D2QbA=='),
(3, 'haha@haha.com', '090b235e9eb8f197f2dd927937222c570396d971222d9009a9189e2b6cc0a2c1', 'gArc81odSfO7Uq42GCkpTg=='),
(4, 'fksurado@tuta.io', '085adc293f49e05a442f6efcf8b200b9dd2aef4172a962fa968544621abab492', '3JhiSlikm21W2316jbRJ6Q==');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `manpass`
--
ALTER TABLE `manpass`
  ADD PRIMARY KEY (`id_manpass`),
  ADD KEY `id_user_fk` (`id_user_fk`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `manpass`
--
ALTER TABLE `manpass`
  MODIFY `id_manpass` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `manpass`
--
ALTER TABLE `manpass`
  ADD CONSTRAINT `user_fk` FOREIGN KEY (`id_user_fk`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
