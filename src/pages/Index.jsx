import { Box, Button, Center, Container, Flex, Heading, Image, Progress, Text, VStack } from "@chakra-ui/react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from "react-icons/fa";
import React, { useState, useRef } from "react";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Placeholder for actual song details
  const song = {
    title: "Sample Song",
    artist: "Sample Artist",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyfGVufDB8fHx8MTcwODc1MjU4OHww&ixlib=rb-4.0.3&q=80&w=1080",
    file: "GPTENG:get_audio('sample song')", // This will be replaced with an actual song url
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (e) => {
    const audio = audioRef.current;
    const computeProgress = (e.target.currentTime / e.target.duration) * 100;
    setProgress(computeProgress);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={4} mt={10}>
        <Heading as="h1" size="xl">
          Chakra Music Player
        </Heading>
        <Image borderRadius="md" src={song.cover} alt="Album cover" />
        <Text fontSize="2xl">{song.title}</Text>
        <Text fontSize="md" color="gray.500">
          {song.artist}
        </Text>
        <audio ref={audioRef} src={song.file} onTimeUpdate={handleProgress} onEnded={() => setIsPlaying(false)} />
        <Progress value={progress} w="full" colorScheme="pink" />
        <Flex alignItems="center" gap={4}>
          <Button onClick={() => {}} size="lg" variant="ghost">
            <FaStepBackward />
          </Button>
          <Button onClick={togglePlay} size="lg" colorScheme="pink">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </Button>
          <Button onClick={() => {}} size="lg" variant="ghost">
            <FaStepForward />
          </Button>
        </Flex>
        <Center w="full">
          <FaVolumeUp />
          <Progress value={volume * 100} ml={2} w="50%" colorScheme="pink" onClick={handleVolumeChange} />
        </Center>
      </VStack>
    </Container>
  );
};

export default Index;
